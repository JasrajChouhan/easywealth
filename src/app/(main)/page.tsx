import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('clicked');
        }}
        className="border-2 border-red-600 bg-red-400"
        onFocus={() => {
          console.log('focused');
        }}
      >
        Hello World
      </Button>
    </div>
  );
}
