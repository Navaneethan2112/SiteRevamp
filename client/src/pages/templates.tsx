import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Plus, Copy, CheckCircle, Clock, XCircle, Settings } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { WhatsAppTemplate } from "@shared/schema";

// Using the shared schema type

interface SendMessageForm {
  to: string;
  templateName: string;
  variables: string[];
}

export default function Templates() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<WhatsAppTemplate | null>(null);
  const [sendForm, setSendForm] = useState<SendMessageForm>({
    to: '',
    templateName: '',
    variables: []
  });

  // Fetch user-specific WhatsApp templates
  const { data: templates = [], isLoading } = useQuery<WhatsAppTemplate[]>({
    queryKey: ['/api/whatsapp-templates'],
  });

  // Send WhatsApp message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: { to: string; templateName: string; variables: string[] }) => {
      return apiRequest('/api/whatsapp/send', 'POST', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Your WhatsApp message has been delivered.",
      });
      setIsSendDialogOpen(false);
      setSendForm({ to: '', templateName: '', variables: [] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "There was an error sending your message.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (template: WhatsAppTemplate) => {
    setSelectedTemplate(template);
    const variablesArray = template.variables ? JSON.parse(template.variables) : [];
    setSendForm({
      to: '',
      templateName: template.name,
      variables: new Array(variablesArray.length).fill('')
    });
    setIsSendDialogOpen(true);
  };

  const submitSendMessage = () => {
    if (!sendForm.to) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to send the message.",
        variant: "destructive",
      });
      return;
    }

    sendMessageMutation.mutate({
      to: sendForm.to,
      templateName: sendForm.templateName,
      variables: sendForm.variables.filter(v => v.length > 0)
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const copyTemplateText = (template: WhatsAppTemplate) => {
    navigator.clipboard.writeText(template.body);
    toast({
      title: "Template Copied!",
      description: "Template text has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Loading templates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp Templates</h1>
          <p className="text-muted-foreground">
            Manage your approved WhatsApp message templates and send campaigns.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-template">
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>
                  Create a new WhatsApp message template. You'll need to submit it to Meta for approval manually.
                </DialogDescription>
              </DialogHeader>
              <CreateTemplateForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Templates</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {templates.filter(t => t.status === 'APPROVED').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {templates.filter(t => t.status === 'PENDING').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id || template.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                {getStatusIcon(template.status)}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(template.status)}>
                  {template.status || 'APPROVED'}
                </Badge>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Template Body:</Label>
                <div className="mt-1 p-3 bg-muted rounded-md text-sm max-h-32 overflow-y-auto">
                  {template.body}
                </div>
              </div>
              
              {template.variables && JSON.parse(template.variables).length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Variables ({JSON.parse(template.variables).length}):</Label>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {JSON.parse(template.variables).map((variable: string, index: number) => (
                      <span key={index} className="inline-block bg-primary/10 text-primary px-2 py-1 rounded mr-2 mb-1">
                        {`{{${index + 1}}}`} {variable}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyTemplateText(template)}
                  data-testid={`button-copy-${template.name}`}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                {template.status === 'APPROVED' && (
                  <Button
                    size="sm"
                    onClick={() => handleSendMessage(template)}
                    data-testid={`button-send-${template.name}`}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                )}
              </div>
              
              {template.status === 'REJECTED' && template.rejectionReason && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-950 rounded-md">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>Rejection Reason:</strong> {template.rejectionReason}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Send Message Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send WhatsApp Message</DialogTitle>
            <DialogDescription>
              Send a message using the "{selectedTemplate?.name}" template.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number (with country code)</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={sendForm.to}
                onChange={(e) => setSendForm(prev => ({ ...prev, to: e.target.value }))}
                data-testid="input-phone"
              />
            </div>

            {selectedTemplate?.variables && JSON.parse(selectedTemplate.variables).map((variable: string, index: number) => (
              <div key={index}>
                <Label htmlFor={`var-${index}`}>
                  Variable {index + 1}: {variable}
                </Label>
                <Input
                  id={`var-${index}`}
                  placeholder={`Enter ${variable}`}
                  value={sendForm.variables[index] || ''}
                  onChange={(e) => {
                    const newVariables = [...sendForm.variables];
                    newVariables[index] = e.target.value;
                    setSendForm(prev => ({ ...prev, variables: newVariables }));
                  }}
                  data-testid={`input-variable-${index}`}
                />
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={submitSendMessage}
                disabled={sendMessageMutation.isPending}
                data-testid="button-send-message"
              >
                {sendMessageMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Create Template Form Component
function CreateTemplateForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category: 'MARKETING' as const,
    language: 'en',
    body: '',
    variables: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, just show instructions since we're using Twilio-only approach
    toast({
      title: "Template Created!",
      description: "Please follow the manual submission instructions to get this template approved by Meta.",
    });
    
    // Copy template to clipboard
    const templateText = `Name: ${formData.name}
Category: ${formData.category}
Language: ${formData.language}

Body:
${formData.body}

Variables: ${formData.variables.join(', ')}

Submit this template manually in Facebook Business Manager → WhatsApp Manager → Message Templates`;
    
    navigator.clipboard.writeText(templateText);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="template-name">Template Name</Label>
          <Input
            id="template-name"
            placeholder="welcome_message"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            data-testid="input-template-name"
          />
        </div>
        <div>
          <Label htmlFor="template-category">Category</Label>
          <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger data-testid="select-template-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MARKETING">Marketing</SelectItem>
              <SelectItem value="UTILITY">Utility</SelectItem>
              <SelectItem value="AUTHENTICATION">Authentication</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="template-body">Template Body</Label>
        <Textarea
          id="template-body"
          placeholder="Enter your template message. Use {{1}}, {{2}}, etc. for variables..."
          value={formData.body}
          onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
          className="min-h-[100px]"
          required
          data-testid="textarea-template-body"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Use {`{{1}} {{2}}`} for variables. Keep under 512 characters for best approval rates.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
        <h4 className="font-medium mb-2">📋 Manual Submission Required</h4>
        <p className="text-sm text-muted-foreground">
          After creating this template, you'll need to manually submit it to Meta for approval:
        </p>
        <ol className="text-sm text-muted-foreground mt-2 list-decimal list-inside space-y-1">
          <li>Go to Facebook Business Manager</li>
          <li>Navigate to WhatsApp Manager → Message Templates</li>
          <li>Click "Create Template"</li>
          <li>Copy the template details and submit for review</li>
          <li>Approval typically takes 24-48 hours</li>
        </ol>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" data-testid="button-create-template-submit">
          Create Template
        </Button>
      </div>
    </form>
  );
}