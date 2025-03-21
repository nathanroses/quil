import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UpgradeButton from '@/components/UpgradeButton'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'For personal projects and casual use.',
      quota: PLANS.find((p) => p.slug === 'free')!.quota,
      features: [
        {
          text: `${PLANS.find((p) => p.slug === 'free')!.pagesPerPdf} pages per PDF`,
          footnote:
            'The maximum amount of pages per PDF-file.',
        },
        {
          text: '4MB file size limit',
          footnote:
            'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote:
            'Better algorithmic responses for enhanced content quality',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'For professionals with advanced needs.',
      quota: PLANS.find((p) => p.slug === 'pro')!.quota,
      features: [
        {
          text: `${PLANS.find((p) => p.slug === 'pro')!.pagesPerPdf} pages per PDF`,
          footnote:
            'The maximum amount of pages per PDF-file.',
        },
        {
          text: '16MB file size limit',
          footnote:
            'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote:
            'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
  ]

  return (
    <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
      <div className='mx-auto mb-10 sm:max-w-lg'>
        <h1 className='text-6xl font-bold sm:text-7xl'>
          Pricing
        </h1>
        <p className='mt-5 text-gray-600 sm:text-lg'>
          Whether you&apos;re just trying out our service
          or need more, we&apos;ve got you covered.
        </p>
      </div>

      <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
        <TooltipProvider>
          {pricingItems.map(
            ({ plan, tagline, quota, features }) => {
              const price =
                PLANS.find(
                  (p) => p.slug === plan.toLowerCase()
                )?.price.amount || 0

              const isPro = plan === 'Pro'

              return (
                <div
                  key={plan}
                  className={cn(
                    'relative rounded-2xl bg-white shadow-lg border-2 overflow-hidden mt-8',
                    {
                      'border-blue-600 shadow-blue-200': isPro,
                      'border-gray-200': !isPro,
                    }
                  )}>
                  {isPro && (
                    <div className='absolute top-0 left-0 right-0 mx-auto w-40 rounded-b-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-md'>
                      Most Popular
                    </div>
                  )}

                  <div className='p-5'>
                    <h3 className='my-3 text-center font-display text-3xl font-bold'>
                      {plan}
                    </h3>
                    <p className='text-gray-500'>
                      {tagline}
                    </p>
                    <p className='my-5 font-display text-6xl font-semibold'>
                      ${price}
                    </p>
                    <p className='text-gray-500'>
                      per month
                    </p>
                  </div>

                  <div className='flex h-20 items-center justify-center border-y border-gray-200 bg-gray-50'>
                    <div className='flex items-center space-x-1'>
                      <p className='font-medium text-gray-800'>
                        {quota.toLocaleString()} PDFs/mo included
                      </p>

                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className='cursor-default ml-1.5'>
                          <HelpCircle className='h-4 w-4 text-zinc-500' />
                        </TooltipTrigger>
                        <TooltipContent className='w-80 p-2'>
                          How many PDFs you can upload per month.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <ul className='my-10 space-y-5 px-8'>
                    {features.map(
                      ({ text, footnote, negative }) => (
                        <li
                          key={text}
                          className='flex space-x-5'>
                          <div className='flex-shrink-0'>
                            {negative ? (
                              <Minus className='h-6 w-6 text-gray-300' />
                            ) : (
                              <Check className='h-6 w-6 text-blue-500' />
                            )}
                          </div>
                          {footnote ? (
                            <div className='flex items-center space-x-1'>
                              <p
                                className={cn(
                                  'text-gray-600',
                                  {
                                    'text-gray-400':
                                      negative,
                                  }
                                )}>
                                {text}
                              </p>
                              <Tooltip
                                delayDuration={300}>
                                <TooltipTrigger className='cursor-default ml-1.5'>
                                  <HelpCircle className='h-4 w-4 text-zinc-500' />
                                </TooltipTrigger>
                                <TooltipContent className='w-80 p-2'>
                                  {footnote}
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          ) : (
                            <p
                              className={cn(
                                'text-gray-600',
                                {
                                  'text-gray-400':
                                    negative,
                                }
                              )}>
                              {text}
                            </p>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                  <div className='border-t border-gray-200' />
                  <div className='p-5'>
                    {plan === 'Free' ? (
                      <Link
                        href={
                          user ? '/dashboard' : '/api/auth/register'
                        }
                        className={buttonVariants({
                          className: 'w-full',
                          variant: 'secondary',
                        })}>
                        {user ? 'Dashboard' : 'Sign up for free'}
                        <ArrowRight className='h-5 w-5 ml-1.5' />
                      </Link>
                    ) : user ? (
                      <UpgradeButton />
                    ) : (
                      <Link
                        href='/api/auth/register'
                        className={buttonVariants({
                          className: 'w-full',
                        })}>
                        {user ? 'Upgrade now' : 'Sign up'}
                        <Sparkles className='h-5 w-5 ml-1.5' />
                      </Link>
                    )}
                  </div>
                </div>
              )
            }
          )}
        </TooltipProvider>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold">Need a custom plan?</h3>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          We offer custom solutions for teams and enterprises. Contact us to learn more about our enterprise plans with advanced security, admin controls, and more.
        </p>
        <Link
          href="mailto:contact@mochaapp.com"
          className={buttonVariants({
            variant: 'outline',
            className: 'mt-6',
          })}>
          Contact Sales
        </Link>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page

