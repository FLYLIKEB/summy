import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "스마트 요약",
    description: "AI 기술을 활용한 정확하고 효율적인 텍스트 요약",
  },
  {
    title: "실시간 동기화",
    description: "모든 기기에서 실시간으로 데이터 동기화",
  },
  {
    title: "맞춤형 설정",
    description: "사용자 맞춤형 설정으로 최적화된 경험",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 