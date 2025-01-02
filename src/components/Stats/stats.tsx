import { statsData } from '@/data/landing';

export const Stats = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <h1 className="text-4xl font-bold text-blue-600">{stat.value}</h1>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
