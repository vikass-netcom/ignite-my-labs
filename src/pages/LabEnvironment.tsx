import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ExternalLink, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LabCredentials {
  azurePortalUrl: string;
  subscription: string;
  username: string;
  password: string;
  tap: string;
  vmUsername: string;
  vmPassword: string;
}

const LabEnvironment = () => {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mock credentials - in real app, these would come from backend
  const credentials: LabCredentials = {
    azurePortalUrl: "https://portal.azure.com/#home",
    subscription: "193b7ebb-6d18-4985-9af3-f49585571",
    username: "LabUser-56323749@LODSPRODMSLRARNMCA.onm",
    password: "HBk11l#h#lBtq",
    tap: "7LF%D%W",
    vmUsername: "Admin",
    vmPassword: "Pa55w.rd",
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast({
      title: "Copied!",
      description: `${fieldName} copied to clipboard`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CredentialField = ({ label, value, fieldName }: { label: string; value: string; fieldName: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-foreground">{value}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(value, label)}
          className="h-8 w-8 p-0"
        >
          {copiedField === label ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/course/${courseId}`)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Modules
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold text-foreground">
                Manage Microsoft Entra ID Identities (Requires MFA - Lab Optional)
              </h1>
            </div>
            <Button
              variant="destructive"
              onClick={() => navigate("/")}
            >
              End Lab
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Lab Connection Screen */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-white text-lg">Please wait while connecting...</p>
          </div>
          
          {/* Optional: Show Azure Portal in iframe after connection */}
          <iframe
            src="https://portal.azure.com/#home"
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
            title="Azure Portal"
          />
        </div>

        {/* Right Side - Instructions Panel */}
        <div className="w-[400px] bg-card border-l border-border flex flex-col">
          <Tabs defaultValue="instructions" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger 
                value="instructions" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Instructions
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Resources
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto">
              <TabsContent value="instructions" className="m-0 p-6 space-y-6">
                {/* Azure Portal Credentials */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Azure Portal
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(credentials.azurePortalUrl, "_blank")}
                        className="gap-2 h-8"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Open
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <CredentialField 
                      label="URL" 
                      value={credentials.azurePortalUrl} 
                      fieldName="URL"
                    />
                    <CredentialField 
                      label="Subscription" 
                      value={credentials.subscription} 
                      fieldName="Subscription"
                    />
                    <CredentialField 
                      label="Username" 
                      value={credentials.username} 
                      fieldName="Username"
                    />
                    <CredentialField 
                      label="Password" 
                      value={credentials.password} 
                      fieldName="Password"
                    />
                    <CredentialField 
                      label="TAP" 
                      value={credentials.tap} 
                      fieldName="TAP"
                    />
                  </CardContent>
                </Card>

                {/* VM Credentials */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">SEA-DEV</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <CredentialField 
                      label="Username" 
                      value={credentials.vmUsername} 
                      fieldName="VM Username"
                    />
                    <CredentialField 
                      label="Password" 
                      value={credentials.vmPassword} 
                      fieldName="VM Password"
                    />
                  </CardContent>
                </Card>

                {/* Lab Instructions */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Lab Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Task 1: Create and configure user accounts</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Sign in to the Azure portal using the credentials provided</li>
                        <li>Navigate to Microsoft Entra ID</li>
                        <li>Create a new user with the required permissions</li>
                        <li>Configure multi-factor authentication for the user</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Task 2: Manage group memberships</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Create a new security group</li>
                        <li>Add users to the group</li>
                        <li>Verify group memberships</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="m-0 p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Additional Resources</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <a 
                        href="https://learn.microsoft.com/azure" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        Microsoft Learn - Azure Documentation
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://learn.microsoft.com/entra" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        Microsoft Entra ID Documentation
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LabEnvironment;
