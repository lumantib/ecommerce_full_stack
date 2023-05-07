import CheckoutItem from "./CheckoutItem"

const CheckoutItems = () => {
    return (
        <div className="flex flex-col gap-2 border-2 border-gray-700 p-2">
            <CheckoutItem />
            <CheckoutItem />
            <CheckoutItem />
            <CheckoutItem />
            <CheckoutItem />
        </div>
    )
}

export default CheckoutItems