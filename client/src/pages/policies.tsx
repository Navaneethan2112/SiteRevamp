import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Shield, FileText, Users, Lock } from 'lucide-react';
import { Link } from 'wouter';

export default function Policies() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Legal Policies</h1>
              <p className="text-muted-foreground">AaraConnect WhatsApp Business Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="privacy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy Policy</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Terms of Service</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Data Processing</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Compliance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <p className="text-muted-foreground">Last updated: January 2025</p>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
                    <p className="text-muted-foreground mb-4">
                      At AaraConnect, we collect information necessary to provide you with our WhatsApp Business messaging services:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Business contact information (name, email, phone number)</li>
                      <li>WhatsApp Business account details</li>
                      <li>Message content and metadata for service delivery</li>
                      <li>Usage analytics and performance metrics</li>
                      <li>Billing and payment information</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
                    <p className="text-muted-foreground mb-4">
                      Your information is used solely for providing and improving our WhatsApp messaging services:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Delivering WhatsApp messages to your customers</li>
                      <li>Managing your chatbot and automation workflows</li>
                      <li>Providing customer support and technical assistance</li>
                      <li>Generating analytics and reporting</li>
                      <li>Processing payments and billing</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">3. Data Security & Storage</h3>
                    <p className="text-muted-foreground mb-4">
                      We implement industry-standard security measures to protect your data:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>End-to-end encryption for message transmission</li>
                      <li>Secure cloud infrastructure with regular backups</li>
                      <li>Access controls and authentication mechanisms</li>
                      <li>Regular security audits and compliance checks</li>
                      <li>Data retention policies aligned with legal requirements</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">4. Contact Information</h3>
                    <p className="text-muted-foreground">
                      For privacy-related inquiries, please contact us at <strong>privacy@aaraconnect.com</strong> or call us at:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2">
                      <li>UAE: +971 508508155</li>
                      <li>India: +91 9514004877</li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
                <p className="text-muted-foreground">Last updated: January 2025</p>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">1. Service Description</h3>
                    <p className="text-muted-foreground mb-4">
                      AaraConnect provides WhatsApp Business API services including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>WhatsApp Business messaging platform</li>
                      <li>Chatbot automation and AI-powered responses</li>
                      <li>Bulk messaging and campaign management</li>
                      <li>Analytics and reporting dashboard</li>
                      <li>Template management and approval assistance</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">2. Acceptable Use Policy</h3>
                    <p className="text-muted-foreground mb-4">
                      Customers must comply with WhatsApp's Business Policy and local regulations:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>No spam or unsolicited messages</li>
                      <li>Obtain proper consent before messaging customers</li>
                      <li>Comply with local data protection laws (GDPR, etc.)</li>
                      <li>No harmful, illegal, or inappropriate content</li>
                      <li>Respect message rate limits and WhatsApp guidelines</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">3. Billing and Payments</h3>
                    <p className="text-muted-foreground mb-4">
                      Billing terms for AaraConnect services:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Monthly subscription billing in advance</li>
                      <li>Usage charges for messages exceeding plan limits</li>
                      <li>Payment due within 30 days of invoice</li>
                      <li>Service suspension for overdue accounts</li>
                      <li>Refunds available per our refund policy</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">4. Service Level Agreement</h3>
                    <p className="text-muted-foreground mb-4">
                      We guarantee the following service levels:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>99.9% uptime for message delivery</li>
                      <li>24/7 customer support for Professional+ plans</li>
                      <li>Message delivery within 5 seconds average</li>
                      <li>Response to support tickets within 4 hours</li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Processing Agreement</CardTitle>
                <p className="text-muted-foreground">GDPR & International Compliance</p>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Data Processing Principles</h3>
                    <p className="text-muted-foreground mb-4">
                      AaraConnect operates as a data processor for customer data and follows these principles:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Process data only as instructed by the customer</li>
                      <li>Implement appropriate technical and organizational measures</li>
                      <li>Ensure data processor confidentiality</li>
                      <li>Assist with data subject rights requests</li>
                      <li>Notify of data breaches within 72 hours</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">International Transfers</h3>
                    <p className="text-muted-foreground mb-4">
                      Data may be processed in the following jurisdictions:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>United Arab Emirates (primary data center)</li>
                      <li>India (backup and development)</li>
                      <li>European Union (EU customers only)</li>
                      <li>All transfers protected by Standard Contractual Clauses</li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Certifications</CardTitle>
                <p className="text-muted-foreground">Industry standards and certifications</p>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">WhatsApp Business Compliance</h3>
                    <p className="text-muted-foreground mb-4">
                      We are an official WhatsApp Business Solution Provider:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Certified WhatsApp Business API partner</li>
                      <li>Compliance with WhatsApp Commerce Policy</li>
                      <li>Adherence to WhatsApp Business Policy</li>
                      <li>Regular compliance audits and monitoring</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Security Certifications</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>ISO 27001 Information Security Management</li>
                      <li>SOC 2 Type II compliance</li>
                      <li>GDPR Data Protection compliance</li>
                      <li>UAE Data Protection Law compliance</li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}