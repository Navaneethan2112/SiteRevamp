import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  name: string;
  category: string;
  body: string;
  variables: string[];
}

const templates: Template[] = [
  {
    name: 'welcome_series',
    category: 'MARKETING',
    body: '🎉 Welcome to AaraConnect!\n\nStart growing your business with professional WhatsApp messaging:\n✅ Send bulk campaigns\n✅ Set up AI chatbots\n✅ Track analytics\n\nReady to get started? Visit your dashboard: {{1}}\n\nReply STOP to opt out anytime.',
    variables: ['dashboard_url']
  },
  {
    name: 'feature_announcement', 
    category: 'MARKETING',
    body: '📢 New Feature Alert!\n\nAaraConnect now supports {{1}}!\n\nThis helps you:\n• {{2}}\n• {{3}}\n• Improve customer engagement\n\nCheck it out in your dashboard today.\n\nQuestions? Reply to this message.',
    variables: ['feature_name', 'benefit_1', 'benefit_2']
  },
  {
    name: 'marketing_tips',
    category: 'MARKETING', 
    body: '💡 WhatsApp Marketing Tip #{{1}}\n\n{{2}}\n\nThis strategy helped our clients increase response rates by {{3}}%.\n\nWant to learn more tips? Visit: {{4}}\n\nReply TIPS for more marketing insights.',
    variables: ['tip_number', 'tip_content', 'percentage', 'learn_more_url']
  }
];

export default function WhatsAppMarketing() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleTemplateSelect = (templateName: string) => {
    const template = templates.find(t => t.name === templateName);
    if (template) {
      setSelectedTemplate(template);
      setVariables(new Array(template.variables.length).fill(''));
    }
  };

  const updateVariable = (index: number, value: string) => {
    const newVariables = [...variables];
    newVariables[index] = value;
    setVariables(newVariables);
  };

  const sendSingleMessage = async () => {
    if (!selectedTemplate || !phoneNumber) {
      toast({
        title: "Missing Information", 
        description: "Please select a template and enter a phone number",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: phoneNumber,
          templateName: selectedTemplate.name,
          variables: variables
        })
      });

      if (response.ok) {
        toast({
          title: "Message Sent! ✅",
          description: `WhatsApp message sent successfully to ${phoneNumber}`,
        });
        setPhoneNumber('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Send Failed ❌", 
        description: "Failed to send WhatsApp message. Check your setup.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendBulkMessages = async () => {
    if (!selectedTemplate || !phoneNumbers) {
      toast({
        title: "Missing Information",
        description: "Please select a template and enter phone numbers", 
        variant: "destructive"
      });
      return;
    }

    const phoneList = phoneNumbers.split('\n').filter(p => p.trim());
    
    setIsSending(true);
    try {
      const response = await fetch('/api/whatsapp/bulk-send', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumbers: phoneList,
          templateName: selectedTemplate.name,
          variables: variables
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Bulk Messages Sent! 🚀",
          description: `Sent to ${result.results.sent} customers. ${result.results.failed} failed.`,
        });
        setPhoneNumbers('');
      } else {
        throw new Error('Failed to send bulk messages');
      }
    } catch (error) {
      toast({
        title: "Bulk Send Failed ❌",
        description: "Failed to send bulk messages. Check your setup.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const renderPreview = () => {
    if (!selectedTemplate) return null;

    let preview = selectedTemplate.body;
    variables.forEach((variable, index) => {
      preview = preview.replace(`{{${index + 1}}}`, variable || `[${selectedTemplate.variables[index]}]`);
    });

    return (
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Message Preview:</h4>
        <div className="whitespace-pre-wrap text-green-700 dark:text-green-300 text-sm bg-white dark:bg-green-900 p-3 rounded border">
          {preview}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">WhatsApp Marketing Dashboard</h1>
          <p className="text-muted-foreground mt-2">Send approved WhatsApp templates to your customers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Select Template
              </CardTitle>
              <CardDescription>Choose your approved WhatsApp message template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Template</Label>
                  <Select onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.name} value={template.name}>
                          <div>
                            <div className="font-medium">{template.name.replace('_', ' ')}</div>
                            <div className="text-sm text-muted-foreground">{template.category}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTemplate && (
                  <div className="space-y-3">
                    <Label>Template Variables</Label>
                    {selectedTemplate.variables.map((variable, index) => (
                      <div key={index}>
                        <Label className="text-sm">{variable.replace('_', ' ')}</Label>
                        <Input
                          placeholder={`Enter ${variable.replace('_', ' ')}`}
                          value={variables[index] || ''}
                          onChange={(e) => updateVariable(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {renderPreview()}
              </div>
            </CardContent>
          </Card>

          {/* Single Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send Single Message
              </CardTitle>
              <CardDescription>Send to one customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    data-testid="input-phone-number"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Include country code (e.g., +1)</p>
                </div>

                <Button 
                  onClick={sendSingleMessage} 
                  disabled={!selectedTemplate || !phoneNumber || isSending}
                  className="w-full"
                  data-testid="button-send-single"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Messages */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Bulk Messaging
              </CardTitle>
              <CardDescription>Send to multiple customers at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Phone Numbers (one per line)</Label>
                  <Textarea
                    placeholder="+1234567890&#10;+9876543210&#10;+1122334455"
                    value={phoneNumbers}
                    onChange={(e) => setPhoneNumbers(e.target.value)}
                    rows={5}
                    data-testid="textarea-phone-numbers"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter one phone number per line with country codes
                  </p>
                </div>

                <Button 
                  onClick={sendBulkMessages}
                  disabled={!selectedTemplate || !phoneNumbers || isSending}
                  className="w-full"
                  data-testid="button-send-bulk"
                >
                  {isSending ? 'Sending Bulk Messages...' : 'Send Bulk Messages'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Best Practices */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">✅ Do:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Only message customers who opted in</li>
                  <li>• Test templates before bulk sending</li>
                  <li>• Send during business hours</li>
                  <li>• Personalize with customer names</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">❌ Don't:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Send to random phone numbers</li>
                  <li>• Exceed daily message limits</li>
                  <li>• Send promotional content as utility</li>
                  <li>• Ignore customer opt-out requests</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}