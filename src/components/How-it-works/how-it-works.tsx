import { howItWorksData } from '@/data/landing';

export const HowItWorks = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
        <div className="gr grid grid-cols-1 gap-8 md:grid-cols-3">
          {howItWorksData.map((step, index) => (
            <div key={index} className="text-center">
              <div className="space-y-4 pt-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-center">
                  {step.icon}
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{step.title}</h1>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
