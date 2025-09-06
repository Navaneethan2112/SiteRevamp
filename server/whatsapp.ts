import { Client } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioWhatsAppNumber) {
  throw new Error('Missing Twilio credentials. Please check your environment variables.');
}

const client = new Client(accountSid, authToken);

export interface WhatsAppMessage {
  to: string;
  body: string;
  mediaUrl?: string;
}

export interface WhatsAppTemplate {
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  body: string;
  variables?: string[];
}

// Pre-approved marketing templates
export const marketingTemplates: WhatsAppTemplate[] = [
  {
    name: 'welcome_series',
    category: 'MARKETING',
    language: 'en',
    body: '🎉 Welcome to AaraConnect!\n\nStart growing your business with professional WhatsApp messaging:\n✅ Send bulk campaigns\n✅ Set up AI chatbots\n✅ Track analytics\n\nReady to get started? Visit your dashboard: {{1}}\n\nReply STOP to opt out anytime.',
    variables: ['dashboard_url']
  },
  {
    name: 'feature_announcement',
    category: 'MARKETING',
    language: 'en',
    body: '📢 New Feature Alert!\n\nAaraConnect now supports {{1}}!\n\nThis helps you:\n• {{2}}\n• {{3}}\n• Improve customer engagement\n\nCheck it out in your dashboard today.\n\nQuestions? Reply to this message.',
    variables: ['feature_name', 'benefit_1', 'benefit_2']
  },
  {
    name: 'marketing_tips',
    category: 'MARKETING',
    language: 'en',
    body: '💡 WhatsApp Marketing Tip #{{1}}\n\n{{2}}\n\nThis strategy helped our clients increase response rates by {{3}}%.\n\nWant to learn more tips? Visit: {{4}}\n\nReply TIPS for more marketing insights.',
    variables: ['tip_number', 'tip_content', 'percentage', 'learn_more_url']
  },
  {
    name: 'success_story',
    category: 'MARKETING',
    language: 'en',
    body: '🌟 Success Story\n\n"{{1}}" - {{2}}, {{3}}\n\nSee how AaraConnect helped them achieve:\n• {{4}} more customer responses\n• {{5}} time savings\n• Better customer satisfaction\n\nReady for similar results? Let\'s chat!',
    variables: ['testimonial', 'customer_name', 'company_name', 'response_increase', 'time_savings']
  },
  {
    name: 'limited_offer',
    category: 'MARKETING',
    language: 'en',
    body: '⏰ Limited Time: {{1}} Days Left\n\nGet {{2}}% off your AaraConnect upgrade!\n\n✅ Unlock advanced features\n✅ Send more messages\n✅ Priority support\n\nUse code: {{3}}\nExpires: {{4}}\n\nUpgrade now: {{5}}',
    variables: ['days_left', 'discount_percentage', 'promo_code', 'expiry_date', 'upgrade_url']
  }
];

export class WhatsAppService {
  private client: Client;

  constructor() {
    this.client = client;
  }

  async sendMessage(message: WhatsAppMessage): Promise<string> {
    try {
      const twilioMessage = await this.client.messages.create({
        from: twilioWhatsAppNumber,
        to: `whatsapp:${message.to}`,
        body: message.body,
        ...(message.mediaUrl && { mediaUrl: message.mediaUrl })
      });

      console.log(`WhatsApp message sent successfully: ${twilioMessage.sid}`);
      return twilioMessage.sid;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw new Error(`Failed to send WhatsApp message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async sendTemplateMessage(
    to: string, 
    templateName: string, 
    variables: string[] = []
  ): Promise<string> {
    const template = marketingTemplates.find(t => t.name === templateName);
    
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    // Replace variables in template body
    let body = template.body;
    variables.forEach((variable, index) => {
      body = body.replace(`{{${index + 1}}}`, variable);
    });

    return this.sendMessage({ to, body });
  }

  async sendBulkMessages(
    phoneNumbers: string[], 
    templateName: string, 
    variables: string[] = []
  ): Promise<{ success: string[], failed: { phone: string, error: string }[] }> {
    const results = {
      success: [] as string[],
      failed: [] as { phone: string, error: string }[]
    };

    // Send messages with delay to respect rate limits
    for (const phoneNumber of phoneNumbers) {
      try {
        await this.sendTemplateMessage(phoneNumber, templateName, variables);
        results.success.push(phoneNumber);
        
        // Add 1 second delay between messages to respect WhatsApp rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.failed.push({
          phone: phoneNumber,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  getAvailableTemplates(): WhatsAppTemplate[] {
    return marketingTemplates;
  }

  getTemplate(templateName: string): WhatsAppTemplate | undefined {
    return marketingTemplates.find(t => t.name === templateName);
  }

  // Handle incoming WhatsApp webhooks
  static processIncomingMessage(body: any) {
    return {
      from: body.From?.replace('whatsapp:', ''),
      to: body.To?.replace('whatsapp:', ''),
      body: body.Body,
      messageId: body.MessageSid,
      timestamp: new Date(),
      mediaUrl: body.MediaUrl0 || null,
      mediaType: body.MediaContentType0 || null
    };
  }
}

export const whatsAppService = new WhatsAppService();