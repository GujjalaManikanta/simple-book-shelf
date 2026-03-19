import { Library, BookOpen, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LibraryStatsProps {
  totalBooks: number;
  totalCopies: number;
  borrowedBooks: number;
}

const LibraryStats = ({ totalBooks, totalCopies, borrowedBooks }: LibraryStatsProps) => {
  const availableBooks = totalCopies - borrowedBooks;
  const utilizationRate = totalCopies > 0 ? Math.round((borrowedBooks / totalCopies) * 100) : 0;

  const stats = [
    {
      label: "Unique Titles",
      value: totalBooks,
      icon: Library,
      description: "Collection diversity",
      color: "text-primary",
    },
    {
      label: "Total Inventory",
      value: totalCopies,
      icon: BookOpen,
      description: "Volumes in archive",
      color: "text-primary",
    },
    {
      label: "Currently Circulating",
      value: borrowedBooks,
      icon: Clock,
      description: `${utilizationRate}% utilization rate`,
      color: "text-accent",
    },
    {
      label: "Ready for Accession",
      value: availableBooks,
      icon: AlertCircle,
      description: "Available on shelves",
      color: "text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 animate-archive-in">
      {stats.map((stat, i) => (
        <Card key={stat.label} className="archive-card border-primary/10 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="academic-label mb-2">{stat.label}</p>
                <h3 className="text-3xl font-bold font-serif leading-none mb-2">{stat.value}</h3>
                <p className="text-[10px] text-muted-foreground font-medium italic">{stat.description}</p>
              </div>
              <div className={`${stat.color} bg-primary/5 p-2 rounded`}>
                <stat.icon className="h-5 w-5 opacity-80" />
              </div>
            </div>
            {/* Subtle progress bar for utilization if it's the circulating stat */}
            {stat.label === "Currently Circulating" && (
              <div className="mt-4 h-1 w-full bg-primary/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-1000" 
                  style={{ width: `${utilizationRate}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LibraryStats;
