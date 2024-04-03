import {
  Banner,
  useApi,
  reactExtension,
  useCartLines,
  Button,
  InlineStack,
  ChoiceList,
  BlockStack,
  Choice,
  Form,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';
import { cartRestore, saveForLater } from './api';
export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const { checkoutToken: { current: currentCheckoutToken }, } = useApi();
  const lineItems = useCartLines();
  const [savedCart, setSavedCart] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  //if items checked are equal to those in currently saved cart, disable save button
  const disableSubmit = (checkedItems.length === 0) | (checkedItems.toString() === savedCart?.productIds?.toString())

  async function getSavedCart() {
    const cart = await (await cartRestore(currentCheckoutToken)).json()
    setSavedCart(cart)
    // if saved cart exists - enable restore button
  }

  async function handleSubmit() {
    const response = await saveForLater(currentCheckoutToken, checkedItems)
    if (response) setSavedCart(response.json())
  }

  useEffect(() => {
    //check server for an existing saved cart
    getSavedCart();
  }, [])

  return (
    <Banner title="Save Cart For Later" collapsible>
      <Form onSubmit={handleSubmit}>
        <InlineStack>
          <ChoiceList
            name="choiceItems"
            value={checkedItems}
            onChange={(value) => {
              setCheckedItems(value)
            }}
          >
            <BlockStack>
              {lineItems.map(item => (
                <Choice id={item.merchandise.id.split("/").pop() + "*" + item.quantity} key={item.merchandise.id}>
                  {item.merchandise.title + " " + item.merchandise.id}
                </Choice>))}
            </BlockStack>
          </ChoiceList>
        </InlineStack>

        <Button accessibilityRole='submit' disabled={disableSubmit}>
          Save
        </Button>
      </Form>
    </Banner>
  );
}