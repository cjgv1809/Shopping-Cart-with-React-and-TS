import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCartContext();

  const total = cartItems.reduce((acc, curr) => {
    const item = storeItems.find((item) => item.id === curr.id);
    return acc + (item?.price || 0) * curr.quantity;
  }, 0);

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total: <span>{formatCurrency(total)}</span>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
