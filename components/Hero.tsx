import { Button } from "@/components/ui/Button"

export default function Hero() {
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        당신의 일상을 더 스마트하게
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Summy와 함께 더 효율적이고 생산적인 일상을 시작하세요.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button size="lg">시작하기</Button>
        <Button variant="outline" size="lg">
          자세히 알아보기
        </Button>
      </div>
    </section>
  )
} 