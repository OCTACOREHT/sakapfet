import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <Skeleton className="h-16 w-48" />
        <Skeleton className="mt-6 h-72 w-full" />
      </Card>
      <Card>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-6 h-64 w-full" />
      </Card>
      <Card className="lg:col-span-3">
        <Skeleton className="h-80 w-full" />
      </Card>
    </div>
  );
}
