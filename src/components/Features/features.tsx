import { featuresData } from '@/data/landing';
import { Card, CardContent } from '../ui/card';

export const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Everything you need to manage your finances
        </h2>
        <div className="gr grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="space-y-4 pt-4">
                {feature.icon}
                <div>
                  <h1 className="text-xl font-semibold">{feature.title}</h1>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
