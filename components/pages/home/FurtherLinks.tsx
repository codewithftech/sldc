"use client";

import { useEffect, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";

const slides = [
  {
    image: "sites/sldc/files/sldc/about-sldc-signpost-image.jpg",
    alt: "About SLDC",
    title: "About SLDC",
    body: "SLDC is a joint venture between ADNOC Drilling and SLB, combining regional strength with global expertise. We deliver safe, reliable drilling and completion services across the region, underpinned by discipline, operational excellence and a commitment to long term value creation.",
    href: "/about-sldc",
  },
  {
    image: "sites/sldc/files/sldc/services.jpg",
    alt: "Services",
    title: "Services",
    body: "Our integrated drilling and completion services are designed to support complex onshore operations from planning through execution. We combine experienced teams, advanced technologies and disciplined processes to deliver consistent, high quality outcomes for our clients.",
    href: "/services",
  },
  {
    image: "sites/sldc/files/sldc/people-and-careers.jpg",
    alt: "People and careers",
    title: "People and Careers",
    body: "Our people are at the heart of everything we do. We are committed to building a high performance culture that values safety, collaboration and continuous development, offering opportunities to grow within a dynamic and technically driven environment.",
    href: "/people-careers",
  },
] as const;

export default function FurtherLinks() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initSwiper() {
      const { default: Swiper } = await import("swiper/bundle");
      if (cancelled || !swiperRef.current || instanceRef.current) return;

      instanceRef.current = new Swiper(swiperRef.current, {
        slidesPerView: 1.36,
        spaceBetween: 16,
        allowTouchMove: true,
        grabCursor: true,
        watchOverflow: false,
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 16 },
          1200: { slidesPerView: 3, spaceBetween: 32 },
        },
      });
    }

    initSwiper();

    return () => {
      cancelled = true;
      instanceRef.current?.destroy(true, true);
      instanceRef.current = null;
    };
  }, []);

  return (
    <div className="layout-flexible container-fluid bg-base-4 pt-lg-1 pb-lg-1 none">
      <div className="row">
        <div className="container">
          <div className="row">
            <div className="layout__region layout__region--column_1 col-sm-10 offset-sm-1">
              <div data-layout-content-preview-placeholder-label="Further links block">
                <div className="block-main__wrapper">
                  <div id="multiple-signposts12395" className="component-type--multiple-signpost">
                    <div className="multiple-signposts multiple-signposts--large" data-component-animation>
                      <div className="sub-container">
                        <div className="row justify-content-center">
                          <div className="col-12 col-xl-12">
                            <div className="mb-md-3">
                              <div className="component-title d-md-flex align-items-center justify-content-between">
                                <h2 className="display-sm mb-md-0 color-display" data-animate>
                                  Further links
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-12 col-xl-12">
                            <div className="swiper further-links-swiper" ref={swiperRef}>
                              <div className="swiper-wrapper">
                                {slides.map((slide) => (
                                  <div
                                    key={slide.href}
                                    className="swiper-slide h-100"
                                    data-animate
                                    data-disable-child-animation="true"
                                  >
                                    <div
                                      className="signpost-card position-relative d-flex flex-column signpost-card--large"
                                      data-animate
                                    >
                                      <div className="signpost-card__image-wrapper overflow-hidden">
                                        <img
                                          className="signpost-card__image object-fit-cover h-100 w-100"
                                          src={slide.image}
                                          alt={slide.alt}
                                        />
                                      </div>
                                      <div className="signpost-card__content d-flex flex-column p-sm-1 bg-primary-3 card-dark">
                                        <h2 className="headline-lg color-display" data-animate>
                                          {slide.title}
                                        </h2>
                                        <div className="body-sm color-body">{slide.body}</div>
                                        <a
                                          href={slide.href}
                                          className="cta cta--text-link justify-content-start pt-sm-2 cta--overlay-card mt-auto"
                                          role="button"
                                        >
                                          <span className="cta__label">Read more</span>
                                          <span className="cta__icon icon-chevron-right" />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
