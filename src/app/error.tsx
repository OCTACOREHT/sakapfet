"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-danger/30 bg-danger/10">
          <AlertTriangle className="h-8 w-8 text-red-300" />
        </div>
        <h2 className="mt-6 font-heading text-3xl text-white">Flux interrompu</h2>
        <p className="mt-3 text-slate-400">
          Une erreur a interrompu le tableau de bord. Rechargez le flux pour
          reprendre la synchronisation.
        </p>
        <Button className="mt-6" onClick={reset}>
          Relancer le dashboard
        </Button>
      </Card>
    </div>
  );
}
