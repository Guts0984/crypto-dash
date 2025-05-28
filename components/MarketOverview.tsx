import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MarketOverview() {
  return (
    <div className="pr-5 pt-5">
      <Card className="border-none shadow-none">
        <CardHeader className="py-2">
          <CardTitle className="text-xl font-bold ">Market Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
          <p>Card Content</p>
          <p>Card Content2</p>
          <p>Card Content3</p>
          <p>Card Content4</p>
        </CardContent>
      </Card>
    </div>
  );
}
