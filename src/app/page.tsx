import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/app/components/header";
import { ObfuscatorTool } from "@/app/components/obfuscator-tool";
import { CodeReassemblyTool } from "@/app/components/code-reassembly-tool";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <Tabs defaultValue="obfuscator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto bg-card border border-border mb-6">
            <TabsTrigger value="obfuscator" className="text-base">Obfuscator</TabsTrigger>
            <TabsTrigger value="reassembly" className="text-base">Reassembly Tool</TabsTrigger>
          </TabsList>
          <TabsContent value="obfuscator">
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-0">
                <ObfuscatorTool />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reassembly">
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-0">
                <CodeReassemblyTool />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
