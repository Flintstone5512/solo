import Onboard1 from "../../assets/images/Onboard1.png";
import Onboard2 from "../../assets/images/Onboard2.png";
import Onboard3 from "../../assets/images/Onboard3.png";

import Google from "../../assets/images/Google.svg";
import Apple from "../../assets/images/Apple.svg";
import Dark_Apple from "../../assets/images/Dark_Apple.svg";

import Cate1 from "../../assets/images/cate1.svg";
import Cate2 from "../../assets/images/cate2.svg";
import Cate3 from "../../assets/images/cate3.svg";
import Cate4 from "../../assets/images/cate4.svg";
import Cate5 from "../../assets/images/cate5.svg";
import Cate6 from "../../assets/images/cate6.svg";
import Cate7 from "../../assets/images/cate7.svg";
import Cate8 from "../../assets/images/cate8.svg";
import Cate9 from "../../assets/images/cate9.svg";

import Money1 from "../../assets/images/Send_money1.png";
import Money2 from "../../assets/images/Send_money2.png";
import Money3 from "../../assets/images/Send_money3.png";
import Money4 from "../../assets/images/Send_money4.png";
import Money5 from "../../assets/images/Send_money5.png";

import PhonePay from "../../assets/images/phone_pay.svg";
import Paypal from "../../assets/images/paypal.svg";

import Card1 from "../../assets/images/Card1.png";
import Card2 from "../../assets/images/Card2.png";
import Card3 from "../../assets/images/Card3.png";
import Card4 from "../../assets/images/Card4.png";

import Credit from "../../assets/images/credit.svg";
import Debit from "../../assets/images/debit.svg";

import Trans1 from "../../assets/images/trans1.svg";
import Trans2 from "../../assets/images/trans2.svg";
import Trans3 from "../../assets/images/trans3.svg";
import Active_Trans1 from "../../assets/images/active_trans1.svg";
import Active_Trans2 from "../../assets/images/active_trans2.svg";
import Active_Trans3 from "../../assets/images/active_trans3.svg";

import Beneficar1 from "../../assets/images/beneficar1.png";
import Beneficar2 from "../../assets/images/beneficar2.png";

import Profile1 from "../../assets/images/profile1.svg";
import Profile2 from "../../assets/images/profile2.svg";
import Profile3 from "../../assets/images/profile3.svg";
import Profile4 from "../../assets/images/profile4.svg";
import Profile5 from "../../assets/images/profile5.svg";

import Dark_profile1 from "../../assets/images/dark_profile1.svg";
import Dark_profile2 from "../../assets/images/dark_profile2.svg";
import Dark_profile3 from "../../assets/images/dark_profile3.svg";
import Dark_profile4 from "../../assets/images/dark_profile4.svg";
import Dark_profile5 from "../../assets/images/dark_profile5.svg";

export const pages = [
    {
        id: 1,
        image: Onboard1,
        heading: 'Welcome to Solo Money',    
        text: "Your journey to smarter banking starts here. Explore powerful tools and features designed for you.",
    },
    {
        id: 2,
        image: Onboard2,
        heading: '24/7 Customer Service',
        text: "We're here to help, anytime, anywhere. Reach us via chat, email, or phone.",
    },
    {
        id: 3,
        image: Onboard3,
        heading: 'Build Credit, Save $60,000 on Taxes, Secure Your Financial Future',
        text: "Get real-time insights and manage your budget effortlessly. Stay on top of your finances with ease.",
    },
];

export const log_methods = [
    {
        id: 1,
        image: <Google />, 
        dark_image: <Google />,
        text: 'Sign Up with Google',
    },
    {
        id: 2,
        image: <Apple />, 
        dark_image: <Dark_Apple />,
        text: 'Sign Up with Apple',
    },
]


export const categories = [
    {
        id: 1,
        icon: <Cate1 />,
        names: 'Account and Card',
    },
    {
        id: 2,
        icon: <Cate2 />,
        names: 'Transfer',
    },
    {
        id: 3,
        icon: <Cate3 />,
        names: 'Withdraw',
    },
    {
        id: 4,
        icon: <Cate4 />,
        names: 'Mobile prepaid',
    },
    {
        id: 5,
        icon: <Cate5 />,
        names: 'Pay the bill',
    },
    {
        id: 6,
        icon: <Cate6 />,
        names: 'Save online',
    },
    {
        id: 7,
        icon: <Cate7 />,
        names: 'Credit card',
    },
    {
        id: 8,
        icon: <Cate8 />,
        names: 'Transaction report',
    },
    {
        id: 9,
        icon: <Cate9 />,
        names: 'Beneficiary',
    },
]

export const send_money = [
    {
        id: 1,
        image: Money1,
        name: 'Minato',
    },
    {
        id: 2,
        image: Money2,
        name: 'Minato',
    },
    {
        id: 3,
        image: Money3,
        name: 'Minato',
    },
    {
        id: 4,
        image: Money4,
        name: 'Minato',
    },
    {
        id: 5,
        image: Money5,
        name: 'Minato',
    },
]

export const last_transaction = [
    {
        id: 1,
        image: <PhonePay />,
        heading: 'Debited in Phonepay',
        date: '03 October | 5:30 AM',
        amount: '-$500',
    },
    {
        id: 2,
        image: <Paypal />,
        heading: 'Credited in Paypal',
        date: '03 October | 5:30 AM',
        amount: '+$500',
    }
]

export const swipper_data = [
    {
        id: 1,
        image: Card1,
        name: 'Satoru Gojo',
        type: 'Amazon Platinium',
        card_no: '4756  . . . .   . . . .  9018',
        expire: '11/24',
        balance: '$3.469.52',
    },
    {
        id: 2,
        image: Card2,
        name: 'Satoru Gojo',
        type: 'Amazon Platinium',
        card_no: '4756  . . . .   . . . .  9018',
        expire: '11/24',
        balance: '$3.469.52',
    },
    {
        id: 3,
        image: Card3,
        name: 'Satoru Gojo',
        type: 'Amazon Platinium',
        card_no: '4756  . . . .   . . . .  9018',
        expire: '11/24',
        balance: '$3.469.52',
    },
]
export const swipper_data2 = [
    {
        id: 1,
        image: Card1,
        name: 'Satoru Gojo',
        type: 'Amazon Platinium',
        card_no: '4756  . . . .   . . . .  9018',
        expire: '11/24',
        balance: '$3.469.52',
    },
    {
        id: 2,
        image: Card4,
        name: 'Satoru Gojo',
        type: 'Amazon Platinium',
        card_no: '4756  . . . .   . . . .  9018',
        expire: '11/24',
        balance: '$3.469.52',
    },
]
export const duration_data = [
    {
        id: 1,
        time: 'D',
    },
    {
        id: 2,
        time: 'W',
    },
    {
        id: 3,
        time: 'M',
    },
    {
        id: 4,
        time: 'Y',
    },
]

export const progressive_days = [
    {
        id: 1,
        time: 'Sun',
        percentage: 70,
        color: '#3629B7',
    },
    {
        id: 2,
        time: 'Mon',
        percentage: 50,
        color: '#0890FE',
    },
    {
        id: 3,
        time: 'Tue',
        percentage: 60,
        color: '#3629B7',
    },
    {
        id: 4,
        time: 'Wed',
        percentage: 40,
        color: '#0890FE',
    },
    {
        id: 5,
        time: 'Thu',
        percentage: 80,
        color: '#3629B7',
    },
    {
        id: 6,
        time: 'Fri',
        percentage: 90,
        color: '#0890FE',
    },
    {
        id: 7,
        time: 'Sat',
        percentage: 30,
        color: '#3629B7',
    },
];


export const transaction_tabs = [
    {
        id: 1,
        icon: <Credit />,
        text: 'Credited',
        price: '$564,30',
    },
    {
        id: 2,
        icon: <Debit />,
        text: 'Debited',
        price: '$564,30',
    },
]

export const donet_datas = [
    {
        id: 1,
        text: 'Foods',
        color: '#E7E7E7',
    },
    {
        id: 2,
        text: 'Shopping',
        color: '#FB6B18',
    },
    {
        id: 3,
        text: 'Topup',
        color: '#0890FE',
    },
    {
        id: 4,
        text: 'Bills',
        color: '#FF4267',
    },
]

export const options = [
    {
      id: 0,
      option: "VISA **** **** **** 1234", 
    },
    {
      id: 1,
      option: "VISA **** **** **** 1234",
    },
  ];
  

  export const trans_data = [
    {
        id: 1,
        icon: <Trans1 />,
        active: <Active_Trans1 />,
        text: 'Transfer via card number',
    },
    {
        id: 2,
        icon: <Trans2 />,
        active: <Active_Trans2 />,
        text: 'Transfer to the same bank',
    },
    {
        id: 3,
        icon: <Trans3 />,
        active: <Active_Trans3 />,
        text: 'Transfer to another bank',
    },
  ]


  export const beneficar_data = [
     {
        id: 1,
        image: Beneficar1,
        name: 'Emma',
     },
     {
        id: 2,
        image: Beneficar2,
        name: 'Justin',
     },
  ]


  export const text_data = [
    {
        id: 1,
        key: 'number-pad',
        placeholder: 'enter the number',
        label: 'card no'
    },
    {
        id: 2,
        key: 'number-pad',
        placeholder: 'enter the amount',
        label: 'amount',
    },
    {
        id: 3,
        key: 'number-pad',
        placeholder: 'enter the amount',
        label: 'confirm amount',
    },
  ]

  
  export const options2 = [
    {
      id: 0,
      option: "JPMorgan Chase", 
    },
    {
      id: 1,
      option: "	Bank of America",
    },
    {
        id: 2,
        option: "Citigroup",
      },
      {
        id: 3,
        option: "Wells Fargo",
      },
      {
        id: 4,
        option: "Goldman Sachs",
      },

  ];
  

  export const text_data2 = [
    {
        id: 1,
        key: 'number-pad',
        placeholder: 'enter the account number',
        label: 'From'
    },
    {
        id: 2,
        key: 'number-pad',
        placeholder: 'enter the account amount',
        label: 'To',
    },
    {
        id: 3,
        key: 'number-pad',
        placeholder: 'enter the card number',
        label: 'Card Number',
    },
    {
        id: 4,
        key: 'number-pad',
        placeholder: 'enter amount',
        label: 'Transaction Fees',
    },
    {
        id: 5,
        key: 'number-pad',
        placeholder: 'enter amount',
        label: 'Amount',
    },
  
  ]

  export const profile_data = [
    {
        id: 1,
        icon: <Profile1 />,
        active_icon: <Dark_profile1 />,
        name: 'Edit Profile',
    },
    {
        id: 2,
        icon: <Profile2 />,
        active_icon: <Dark_profile2 />,
        name: 'Your favorite songs',
    },

    {
        id: 3,
        icon: <Profile3 />,
        active_icon: <Dark_profile3 />,
        name: 'Dark Mode',
    },
    {
        id: 4,
        icon: <Profile4 />,
        active_icon: <Dark_profile4 />,
        name: 'Help & Support',
    },
    {
        id: 5,
        icon: <Profile5 />,
        active_icon: <Dark_profile5 />,
        name: 'Language',
    },
]