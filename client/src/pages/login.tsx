import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // Assuming you use Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {/* You can put your RoleFlow CV Logo here */}
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-2xl">
              R
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">RoleFlow CV</CardTitle>
          <CardDescription className="text-base">
            Create professional, AI-powered resumes in minutes.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="py-4">
            <p className="text-sm text-muted-foreground text-center mb-6">
              Sign in to access your dashboard, templates, and AI tools.
            </p>

            {/* CLERK TRIGGER: This replaces your old manual login form */}
            <SignInButton mode="modal">
              <Button className="w-full h-12 text-lg font-semibold transition-all hover:scale-[1.02]" size="lg">
                Get Started Now
              </Button>
            </SignInButton>
          </div>

          <p className="text-xs text-center text-muted-foreground px-8">
            By clicking Get Started, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}