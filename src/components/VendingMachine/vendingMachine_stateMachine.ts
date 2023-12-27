import { createMachine } from "xstate";

type InsertCoin = { type: "ADD5" | "ADD10" | "ADD25"; amount: 5 | 10 | 25 };
type ReturnCoin = { type: "RETURN"; amount: 5 | 10 | 25 };

type VendingMachineEvent = InsertCoin | ReturnCoin;

export const vMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDUwDsIEs1QAQFkBDAYwAtswA6AVgGIBBAEUeoG0AGAXUVAAcB7WJgAumfmh4gAHogCMAdnaUALAE51ADlUBmVfOrsN1AGwAaEAE85y+dsr727Y7PYGd8jQF9P51Bmx4RGQUNAzMLhzcSCACQqLikjIICkpqmjp6BkZmlojaAEx2jo4Fzsr5il4+IH5YOAQk5GhUdEyM+WxckrEiYhLRSSkq6qpaug7Z5lYIBtSUHY7K7NrGeh3K3r7odYGNIS5hLJHdgr0JA4jKsnZLxoVL+cbKNtpTctrUcx7aurKyqvlDPJNjVtgEGsFmpQDm0Il1oj14v1QEkrjcnPd2I9nrY3skKspKKoDE5tDZVE59CDauCgk0qDDmB1jgjTkjEpdrioMWSsU8XnjZNR8rJ7CTjHcRfkrtSwfU6ftWsxOlE+Gy+hzkmpCewPK4NIZjPoNDlpgp5MYxY55NdVELnvlZf55XsoULDnDVTF1ecUdYTZQyStiTpdbJlIKhaoaMVqBplMZqB5jE6dhD6dCle0VSc4hqLslVvJKInnPIdP98us8cYVkSND95IDtFoGxtqjSXZCqIDDjnWXnfdJEM5LdpZNLk58W6b3sT7MUJU5yrINFUts7dt35uwPewWWrB8jhwhR4GJzYTdOTXjy8WFq4w8tx+2N2mFVDe21mfDD2dj6iXK3Ji2ICrkWpOPMDa6LWdy6Fiqa0q6PZZv2f7sgWDbFncah3OwygtpkNYWjGiwaBO1CrohXYZh0e4Ht6R6alhJbSqoeEEVo+iCksorFKSsGGAC1FbrRWY-l6iL5n6CAsTh7GApxRHgXaGiUPx1AFMSygNiJ6YhNou5tGhjH-pqLiKDQ46AhKTYNrWgr5Aa8zii4bjaB4ekflQhn0b+pkYTJFlKJpE5OEaTkrK84GAvkLklI4+R2v8zxechgZGUyJlSUOgy6iF1nhXZUU1uRRLFAmyV-NQr6gpu+lQh8fYMTlAFyBUakEfIyiUYZ5qUYKXGkbq4wSsSKYdnKokGVmnq5mZBYWXFF7seW1yPCsgqlupi5rqSAK1Z202NeJ2U+m1+IeCoHk9dc7D9bIgrLGpDiuHGBq1gmaXbkszX+a15mKJaowEViNomHoEYxfdakPhaJirjYh1TQ1VC-bC+7-ed5mrNGbGqEsnzscK8ilcWOmNk27AAiaE1vkhP2ZdmLXY4tRYlgj5bjgC1bgWVJJg88MEeMj9XeSoqEs0xi2WWkowZBMJiCsKhIPhKVYXrI30Zj1fmSazQWyyMYyZIYSvgR5dgCx5ItJi22shLr35ndLhupMbCtZOb0yfF8JI9TViXxg7UIGH9+uuyeE4aMW8NJpVGiTni2rxfhyxFusIctEzc0DgtQU6WOBGrNQoY2lD0zGAGFKLKsfzVaL77pWHztS-nUcddd3W9fd8j6I94EI5miwER07H2yCaD8BAcCSEdqPzYFJ4ALSzggq87fxW+OEYWc0Iv0knuUPFPKxsyZPZ-x7y4B+5YgTmEhSOEJk5OgxxXciUcWAuJh8xKFMCSaYt0pClvhdWQxhqaZmcFoAECgIEaFKnFJYjg4yQIUMKdcdUm7bkBGAzUJNKDkWlFoDoHg+7UEFLoF6xQ+76B0iYage8Oj4ILE2aMK0mxPFrFoKha4iQkgNOWRwq4mFAJwRmQyrCZIKXUtZBQFRNIVFJuBCKHNHCjmDOGVQe8PjSKjilIkN1nAUnKBKSh4EhThnKtaPQWl9CAPpjRR27B9GDAbHFDEBEA5OE+GvKudgDQ6VXH3EUKwxFOOOmjagbjLj5C2s8YaNhS7ZEKHvAwsSIJxXjB5XxPxATCjJtyEowpFJ9ywfPcWmAIAABswCZMSRYs0txoQLEKkaLC3hvBAA */
  id: "Vending Machine",
  initial: "idle",
  predictableActionArguments: true,
  schema: {
    events: {} as VendingMachineEvent,
  },
  states: {
    idle: {},
    "5": {
      on: {
        ADD5: {
          target: "10",
        },
        ADD10: {
          target: "15",
        },
        ADD25: {
          target: "30",
        },
      },
    },
    "10": {
      on: {
        ADD5: {
          target: "20",
        },
        ADD10: {
          target: "25",
        },
        ADD25: {
          target: "35",
        },
      },
    },
    "15": {
      on: {
        ADD5: {
          target: "20",
        },
        ADD10: {
          target: "25",
        },
        ADD25: {
          target: "40",
        },
      },
    },
    "20": {
      on: {
        ADD5: {
          target: "25",
        },
        ADD10: {
          target: "30",
        },
        ADD25: {
          target: "45",
        },
      },
    },
    "25": {
      on: {
        ADD5: {
          target: "30",
        },
        ADD10: {
          target: "35",
        },
        ADD25: {
          target: "50",
        },
      },
    },
    "30": {
      on: {
        ADD5: {
          target: "35",
        },
        ADD10: {
          target: "40",
        },
        ADD25: {
          target: "50",
        },
      },
    },
    "35": {
      on: {
        ADD5: {
          target: "40",
        },
        ADD10: {
          target: "45",
        },
        ADD25: {
          target: "50",
        },
      },
    },
    "40": {
      on: {
        ADD5: {
          target: "10",
        },
        ADD10: {
          target: "15",
        },
        ADD25: {
          target: "30",
        },
      },
    },
    "45": {
      on: {
        ADD5: {
          target: "10",
        },
        ADD10: {
          target: "15",
        },
        ADD25: {
          target: "30",
        },
      },
    },
    "50": {
      on: {
        ADD5: {
          target: "10",
        },
        ADD10: {
          target: "15",
        },
        ADD25: {
          target: "30",
        },
      },
    },
  },
});
