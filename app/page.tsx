import Timetable from "@/components/layouts/Timetable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Timetable />
    </div>
  )
}