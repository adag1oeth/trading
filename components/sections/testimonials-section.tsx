import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Tom",
    role: "ProtoKOLs founder",
    avatar: "/PROTOKOLS_ICON_WHITE.svg",
    quote:
      "Soul's AI Agents is an extremely bullish concept that can revolutionize how we build Web3 communities.",
  },
  {
    name: "Early Tester",
    role: "Alpha Tester",
    avatar: "/placeholder-avatar.png",
    quote:
      "The AI's ability to maintain context across platforms while engaging with relevant accounts is impressive.",
  },
  {
    name: "Beta User",
    role: "Project Lead",
    avatar: "/placeholder-avatar3.png",
    quote:
      "Looking forward to the full release. The demo showed great potential for automated community building.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-dark-navy/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          Early Feedback
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-card animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-neon-pink/10 text-neon-pink">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-container">
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-container">
                  <p className="italic text-white/80">{testimonial.quote}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
