const Faq = () => {
  return (
    <div className="mb-10  ">
      <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-6">
        Frequently Asked Questions (FAQs)
      </h1>
      <div className="collapse collapse-arrow bg-gray-100 mb-1">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium text-gray-800">
          1. What is PharmaWorld, and how does it work?
        </div>
        <div className="collapse-content text-gray-800">
          <p>
            PharmaWorld is an online marketplace where multiple pharmacies and
            medicine vendors sell authentic healthcare products. Customers can
            browse different medicines, compare prices, and order from verified
            sellers.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 mb-1">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-gray-800">
          2. How do I know if the medicines sold here are genuine?
        </div>
        <div className="collapse-content text-gray-800">
          <p>
            We verify all vendors before they start selling on PharmaWorld. Each
            seller must provide valid pharmacy licenses and certifications,
            ensuring that only genuine and high-quality medicines are sold.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 mb-1">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-gray-800">
          3. Can I upload my prescription to order medicines?
        </div>
        <div className="collapse-content text-gray-800">
          <p>
            Yes! If a medicine requires a prescription, you can upload it during
            checkout. Our verified pharmacists will review and approve it before
            processing your order.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 mb-1">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-gray-800">
          4. How do I track my order?
        </div>
        <div className="collapse-content text-gray-800">
          <p>
            Once your order is placed, you will receive an order tracking number
            via email and SMS. You can track the delivery status in real-time on
            the "My Orders" section of your account.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 mb-1">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-gray-800">
          5. What are the available payment methods?
        </div>
        <div className="collapse-content text-gray-800">
          <p>
            <ul>
              <li>Debit/Credit Cards (Visa, Mastercard)</li>
              <li>Cash on Delivery (COD) (Available in select locations)</li>
            </ul>
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 mb-1">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-gray-800">
          6. What is the return and refund policy?
        </div>
        <div className="collapse-content text-gray-800">
          <p>
            You can return medicines within 3 days if:
            <ul>
              <li>The wrong product was delivered.</li>
              <li>The product is expired or damaged.</li>
              <li>The seal is unbroken (except for defective items).</li>
            </ul>
            Refunds will be processed within 5-7 business days after approval.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 ">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-gray-800">
          7. How can I become a seller on PharmaWorld?
        </div>
        <div className="collapse-content text-gray-800">
          <p>
            If you own a licensed pharmacy or sell healthcare products, you can
            join PharmaWorld as a vendor by following these steps:
            <ul>
              <li>Register as a seller on our website.</li>
              <li>
                Upload necessary documents (business license, pharmacy
                registration).
              </li>
              <li>
                Once verified, you can start listing and selling your products.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
