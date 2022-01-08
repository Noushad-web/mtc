import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

const CenterModeCarousel = dynamic(async () => {
  return ( await import('./CarouselCenter_mode') ).default;
})

Builder.registerComponent(CenterModeCarousel, {
  name:'center-carousel',
  image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fd8ed37ba1bc143c0bb76008caff4b0da',

  inputs:[
    {
      name: 'carousel',
      type: 'array',
      defaultValue: [        
        {
          image:
            'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          heading: 'Tikka t1x thermal optic mount - blemished1',
          text: `SKU: T1XR-THRM-1 BLEM Categories: Black Friday Deals from Mountain Tactical, Blemished, NPP, Optic Accessories, Rails, T1x Rail, Tikka T1x, Tikka T1x Optic Mounts, Tikka Upgrades
              Tags: night scope, t1x, thermal scope, Tikka, tikka t1x Brand: Mountain Tactical Company
              $59.99  1 in stock`,
          slug: 'tikka-t3t3x-gen2-billet-magazine-short-action-3-round',
          price: '$59',
          stock: '1'
        },
        {
          image:
            'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          heading: 'Tikka t1x thermal optic mount - blemished2',
          text: `SKU: T1XR-THRM-1 BLEM Categories: Black Friday Deals from Mountain Tactical, Blemished, NPP, Optic Accessories, Rails, T1x Rail, Tikka T1x, Tikka T1x Optic Mounts, Tikka Upgrades
              Tags: night scope, t1x, thermal scope, Tikka, tikka t1x Brand: Mountain Tactical Company
              $59.99  1 in stock`,
          slug: 'tikka-t3t3x-gen2-billet-magazine-short-action-3-round',
          price: '$59',
          stock: '1'
        },
        {
          image:
            'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          heading: 'Tikka t1x thermal optic mount - blemished3',
          text: `SKU: T1XR-THRM-1 BLEM Categories: Black Friday Deals from Mountain Tactical, Blemished, NPP, Optic Accessories, Rails, T1x Rail, Tikka T1x, Tikka T1x Optic Mounts, Tikka Upgrades
              Tags: night scope, t1x, thermal scope, Tikka, tikka t1x Brand: Mountain Tactical Company
              $59.99  1 in stock`,
          slug: 'tikka-t3t3x-gen2-billet-magazine-short-action-3-round',
          price: '$59',
          stock: '1'
        },
        {
          image:
            'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          heading: 'Tikka t1x thermal optic mount - blemished4',
          text: `SKU: T1XR-THRM-1 BLEM Categories: Black Friday Deals from Mountain Tactical, Blemished, NPP, Optic Accessories, Rails, T1x Rail, Tikka T1x, Tikka T1x Optic Mounts, Tikka Upgrades
              Tags: night scope, t1x, thermal scope, Tikka, tikka t1x Brand: Mountain Tactical Company
              $59.99  1 in stock`,
          slug: 'tikka-t3t3x-gen2-billet-magazine-short-action-3-round',
          price: '$59',
          stock: '1'
        },
        {
          image:
            'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          heading: 'Tikka t1x thermal optic mount - blemished5',
          text: `SKU: T1XR-THRM-1 BLEM Categories: Black Friday Deals from Mountain Tactical, Blemished, NPP, Optic Accessories, Rails, T1x Rail, Tikka T1x, Tikka T1x Optic Mounts, Tikka Upgrades
              Tags: night scope, t1x, thermal scope, Tikka, tikka t1x Brand: Mountain Tactical Company
              $59.99  1 in stock`    ,
          slug: 'tikka-t3t3x-gen2-billet-magazine-short-action-3-round',
          price: '$59',
          stock: '1'
        },
      ], 
      subFields: [
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          required: true,
          defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',          
        },
        {
          name: 'heading',
          type: 'string',
          defaultValue: 'Tikka t1x thermal optic mount - blemished1'
        }, 
        {
          name: 'text',
          type: 'longText',
          defaultValue: `SKU: T1XR-THRM-1 BLEM Categories: Black Friday Deals from Mountain Tactical, Blemished, NPP, Optic Accessories, Rails, T1x Rail, Tikka T1x, Tikka T1x Optic Mounts, Tikka Upgrades
              Tags: night scope, t1x, thermal scope, Tikka, tikka t1x Brand: Mountain Tactical Company
              $59.99  1 in stock`
        },
        {
          name: 'slug',
          type: 'string',
          defaultValue: 'tikka-t3t3x-gen2-billet-magazine-short-action-3-round'
        },
        {
          name: 'price',
          type: 'string',
          defaultValue: '$599'
        },
        {
          name: 'stock',
          type: 'number',
          defaultValue: '1'
        }

      ]
    },
  ]
})
