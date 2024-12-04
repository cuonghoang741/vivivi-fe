import { PricingPlan } from "@/types"

export const PAGINATION_PARAMS = {
    page: 1,
    limit: 10
}

export const NAV_BARS = [
    // {
    //     name: 'Trang cá nhân',
    //     path: '/profile/{id}'
    // },
    // {
    //     name: 'Đăng xuất',
    //     path: '/logout'
    // }
]

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Free',
        price: 0,
        description: 'Forever',
        button_label: 'Get Started',
        benefits: [
            'Unlimited chat',
            '3 girl friends',
            '18 actions',
            '24/7 Online',
            'Long term memory',
        ]   
    },
    {
        name: 'Pro',
        price: 9.99,
        description: 'Favorite',
        button_label: 'Start with Plus',
        benefits: [
            'Everything in Free Package, plus',
            'NSFW actions',
            'NSFW clothes',
            'Voice (Maximum 3 hours)',
            'Dirty talk',
        ],
        is_highlight: true,
    },
    {
        name: 'Boss',
        price: 59.99,
        description: 'For large organizations',
        button_label: 'Subscribe',
        benefits: [
            'Everything in the Pro Package, plus',
            'Voice (Maximum 30 hours)',
            '24/7 support',
            'Custom your girl friend',
            'Early access new features',
        ],
    },
]


export const FAQs = [
    {
      "question": "What is your policy on refunds?",
      "answer": "Payments made for using the VIVIVI Platform are non-refundable unless otherwise stated. This includes subscription fees and one-time payments. We recommend reviewing your subscription details carefully before making a purchase."
    },
    {
      "question": "Is it possible to modify my subscription later?",
      "answer": "Yes, you can modify your subscription by contacting us at help@vivifi.me. Please note that changes to your subscription may affect your access to certain features and could result in changes to your billing cycle or fees."
    },
    {
      "question": "Do you provide a trial period for free?",
      "answer": "Our current offerings do not include a free trial period. All subscriptions and services are billed from the date of activation. We encourage you to review the available plans and features to select the option that best fits your needs."
    },
    {
      "question": "Are there any discounts available for non-profit organizations?",
      "answer": "We do not offer specific discounts for non-profit organizations at this time. All users have access to the same pricing structures and subscription options."
    },
    {
      "question": "Am I able to cancel my subscription at any time?",
      "answer": "Yes, you can cancel your subscription at any time. However, please be aware that canceling your subscription may be subject to certain terms, such as early termination charges if you are on a contract plan. For example, if you are on a 12-month contract plan and cancel before the contract end date, an early termination charge for the remaining months will be imposed. We recommend reviewing the specific terms of your subscription plan or contacting our support team for detailed information."
    }
  ]
  