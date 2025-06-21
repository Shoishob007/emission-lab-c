import { Heart, TreePine, Droplets, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DonateSection = () => {
  const causes = [
    {
      icon: <TreePine className="w-8 h-8 text-primary" />,
      title: "Plant Trees",
      amount: "$25",
      description: "Plant 10 trees in deforested areas",
      progress: 78,
      target: "Goal: 10,000 trees",
    },
    {
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      title: "Clean Water",
      amount: "$50",
      description: "Provide clean water access for 5 families",
      progress: 65,
      target: "Goal: 1,000 families",
    },
    {
      icon: <Wind className="w-8 h-8 text-primary" />,
      title: "Wind Energy",
      amount: "$100",
      description: "Support renewable energy projects",
      progress: 89,
      target: "Goal: 50MW capacity",
    },
  ];

  return (
    <section className="py-20 relative bg-gradient-to-br from-green-50 to-blue-50">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574263867128-46468ac28b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Support Our <span className="text-primary">Mission</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of supporters in funding critical environmental
            projects that make a real difference for our planet
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {causes.map((cause, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-border/50"
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {cause.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {cause.title}
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  {cause.amount}
                </div>
                <p className="text-muted-foreground mb-6">
                  {cause.description}
                </p>

                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${cause.progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {cause.progress}% - {cause.target}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Every Contribution Matters
            </h3>
            <p className="text-muted-foreground mb-6">
              Your donation directly funds verified environmental projects and
              helps us expand our impact worldwide. Together, we can create a
              sustainable future for generations to come.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                100% Transparent
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Verified Projects
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Tax Deductible
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
