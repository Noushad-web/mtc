/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Themed,
  jsx,
  Grid,
  Button,
  Input,
  Text,
  IconButton,
  NavLink,
} from 'theme-ui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus, Minus } from '@components/icons'
import { getPrice } from '@lib/swell/storefront-data-hooks/src/utils/product'
import {
  useUpdateItemQuantity,
  useRemoveItemFromCart,
} from '@lib/swell/storefront-data-hooks'

const CartItem = ({
  item,
  currencyCode,
}: {
  item: any
  currencyCode: string
}) => {
  const updateItem = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)
  const updateQuantity = async (quantity: number) => {
    await updateItem(item.id, quantity)
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item.product.id)
    } catch (error) {
      console.error(error)
      setRemoving(false)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <div className="cart__item">
      <figure className="cart__item__img">
        <Image
          width={130}
          height={86}
          unoptimized
          alt={item.product.meta_description}
          src={
            (item.product.images && item.product.images[0].file?.url) ??
            'https://via.placeholder.com/1050x1050'
          }
        />
      </figure>
      <div className="cart__item__content">
        <NavLink
          href={`/shop/${item.product.slug}/`}
          className="cart__item__content__link"
          // sx={{ border: '1px solid black' }}
        >
          <>
            <div className="heading">
              {item.product.name}
              <br />
              <Text className="heading__price">
                {getPrice(item.price, currencyCode)}
              </Text>
            </div>
          </>
        </NavLink>
        <Themed.ul className="cart__item__content__ul">
          <li>
            <div className="cart__item__content__ul__li">
              <IconButton onClick={() => increaseQuantity(-1)}>
                <Minus width={18} height={18} />
              </IconButton>

              <label>
                <Input                  
                  type="number"
                  max={99}
                  min={0}
                  value={quantity}
                  onChange={handleQuantity}
                  onBlur={handleBlur}
                />
              </label>
              <IconButton onClick={() => increaseQuantity(1)}>
                <Plus width={18} height={18} />
              </IconButton>
            </div>
          </li>
          {/* {item.variant.selectedOptions.map((option: any) => (
            <li key={option.value}>
              {option.name}:{option.value}
            </li>
          ))} */}
        </Themed.ul>
      </div>
    </div>
  )
}

/**
 *         

 */

export default CartItem
