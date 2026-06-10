import dynamic from 'next/dynamic'
import HeroSequence from '@/components/HeroSequence'
import Navigation from '@/components/Navigation'
import WhySection from '@/components/WhySection'

// Lazy load heavy components to improve initial page load
const ProductsSection = dynamic(() => import('@/components/ProductsSection'), {
  loading: () => <div className="min-h-96 bg-gray-50" />,
})
const WellnessSection = dynamic(() => import('@/components/WellnessSection'), {
  loading: () => <div className="min-h-96 bg-gray-50" />,
})
const BenefitsSection = dynamic(() => import('@/components/BenefitsSection'), {
  loading: () => <div className="min-h-96 bg-gray-50" />,
})
const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => <div className="min-h-96 bg-gray-50" />,
})
const OrderForm = dynamic(() => import('@/components/OrderForm'), {
  loading: () => <div className="min-h-96 bg-gray-50" />,
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-24 bg-gray-100" />,
})

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="w-full bg-white pt-20">
        <HeroSequence />
        <WhySection />
        <ProductsSection />
        <WellnessSection />
        <BenefitsSection />
        <FAQSection />
        <OrderForm />
      </main>
      <Footer />
    </>
  )
}
