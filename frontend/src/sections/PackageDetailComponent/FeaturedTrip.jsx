import React from 'react'

const FeaturedTrip = () => {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">

            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">

              <div className="bg-[#0b2418] px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
                Featured Trip
              </div>

              <div className="p-4">

                <p className="text-xs text-gray-500">
                  Price per person
                </p>

                <div className="mt-0.5">

                  {price !== null ? (
                    <span className="text-3xl font-bold text-[#0b2418]">
                      ${price}
                    </span>
                  ) : (
                    <span className="text-xl font-bold text-[#0b2418]">
                      Contact us
                    </span>
                  )}

                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {duration} days · all-inclusive
                </p>

                <div className="mt-3 rounded-lg bg-[#eaf6df] p-3">

                  <p className="text-sm font-semibold text-[#0b2418]">
                    Group discounts
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-500">
                    Contact us for group pricing.
                  </p>

                </div>

                <button
                  type="button"
                  className="mt-3 w-full rounded-lg bg-[#4f8f3a] py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d762e]"
                >
                  Check Availability
                </button>

                <button
                  type="button"
                  className="mt-2 w-full rounded-lg border-2 border-[#0b2418] py-2.5 text-sm font-semibold text-[#0b2418] transition hover:bg-[#0b2418] hover:text-white"
                >
                  Make an Inquiry
                </button>

                <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4">

                  <TrustItem
                    icon={<ShieldCheck size={17} />}
                    text="Instant booking confirmed"
                  />

                  <TrustItem
                    icon={<CreditCard size={17} />}
                    text="Secure payments"
                  />

                  <TrustItem
                    icon={<Check size={17} />}
                    text="No hidden costs"
                  />

                </div>

                <div className="mt-4 border-t border-gray-100 pt-3">

                  <div className="flex items-center gap-2">

                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-[#f5b942]"
                    />

                    <span className="text-sm font-bold text-[#0b2418]">
                      {rating}
                    </span>

                    {reviews !== null && (
                      <span className="text-xs text-gray-400">
                        · {reviews} reviews
                      </span>
                    )}

                  </div>

                  <button
                    type="button"
                    className="mt-1 text-xs font-semibold text-[#4f8f3a] hover:underline"
                  >
                    Read reviews
                  </button>

                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-xs font-semibold text-[#0b2418] transition hover:border-[#4f8f3a] hover:text-[#4f8f3a]"
                >
                  <FileText size={16} />
                  Download PDF
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">

                  <Phone size={14} />

                  Need help? Contact us

                </div>

              </div>

            </div>

          </div>
  )
}

export default FeaturedTrip