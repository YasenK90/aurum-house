import { useEffect, useRef, useState } from 'react'
import './index.css'

const rooms = [
  {
    name: 'Courtyard King',
    meta: '34 m² · King bed · Garden outlook',
    price: 'From EGP 6,800 / night',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Nile Terrace Suite',
    meta: '52 m² · King bed · Private terrace',
    price: 'From EGP 9,900 / night',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'House of Light',
    meta: '68 m² · King bed · Deep soaking tub',
    price: 'From EGP 13,500 / night',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
  },
]

const experiences = [
  ['01', 'Sunrise on the river', 'Start slowly: coffee on the terrace, then a private felucca before the city wakes.'],
  ['02', 'The courtyard table', 'Seasonal Egyptian cooking, a short wine list, and dinner beneath old trees.'],
  ['03', 'A room to exhale', 'A small spa, warm stone, quiet treatments, and no schedule worth rushing for.'],
]

const marqueeItems = [
  'West Bank · Luxor',
  'Twelve rooms · One courtyard',
  'The Nile at your door',
  'Mornings without an alarm',
]

const posts = [
  {
    label: '01 — Field note',
    num: '01',
    kind: 'Field note',
    title: 'Four quiet places to watch the Nile',
    date: 'Field notes — October 2026',
    blurb: 'Skip the crowded viewpoints. We know where the light gets soft and the river gets wide.',
    body: [
      'The steps behind the house, just before six. The river is still deciding what colour it wants to be, the feluccas are only masts, and the only sound is a vendor arranging crates on the road below. Sit on the third step — it keeps yesterday’s warmth — and stay until the light commits.',
      'The bend past the banana groves, ten minutes north on the bicycles we keep by the gate. The west bank hills line themselves up behind the palms and the water goes the colour of strong tea. Nobody stops here, because there is nothing to stop for, which is precisely the point.',
      'The roof stair after rain. The dust settles, the air arrives from the desert, and for twenty minutes every silhouette in Luxor is sharper than it has any right to be. Bring the pot of tea up before the moment, not during it.',
      'The ferry landing at dusk, once the day-trippers have gone back to the east bank. Fishermen sort their nets, the light turns copper, and the river — which has been working all day — finally relaxes. We have been told this is not a viewpoint at all. We disagree.',
    ],
  },
  {
    label: '02 — Table',
    num: '02',
    kind: 'Table',
    title: 'What we put on the breakfast table',
    date: 'At the table — October 2026',
    blurb: 'Baladi bread, sharp cheese, tahini, seasonal fruit and coffee that is always stronger than expected.',
    body: [
      'The bread arrives from the oven on the corner before seven, still wrapped in newspaper, still too hot to hold with one hand. We do not bake it ourselves. We have simply been going to the same family for eleven years, and they have been going to the same oven for longer than that.',
      'By the time you sit down there is ful slow-cooked overnight with cumin and lemon, ta’meya crushed from favas that were green this morning, and dyski cheese from a dairy in Esna that sends it down in the same blue crates it has always used. The tomatoes need nothing. The olives come from a grove behind the mango trees.',
      'Fruit depends on the month: guava and citrus in the cool season, mango in June when the whole street smells of it, pomegranate when the light starts turning. The hibiscus stays cold all year, strong enough to stand up to the sweetness. The coffee is stronger than you expect. This is not an accident.',
      'Breakfast runs until eleven because we do not believe in alarms. If you are still eating at ten, nobody will come to move you along. That is rather the point.',
    ],
  },
  {
    label: '03 — The house',
    num: '03',
    kind: 'The house',
    title: 'Why there are only twelve rooms',
    date: 'From the house — September 2026',
    blurb: 'Small means we can notice. A late arrival, a birthday, a favorite chair in the shade.',
    body: [
      'The house was built in 1932 for a merchant who wanted shade, a courtyard, and enough rooms for family to arrive without notice. The family left, the courtyard stayed, and for a while the building forgot what it was for.',
      'We restored it slowly and on purpose: lime plaster instead of paint, the old well uncovered, the palm gutters reshaped so the roof still sings a little when it rains. Everything else we left alone.',
      'There are twelve rooms because twelve is the number where nothing gets lost. We know who is leaving early and who will want the late table. The kitchen cooks for one dining room, not a crowd. A house that grows past that starts keeping records instead of memories.',
      'People ask when we will take the empty building across the road. Probably never. Small means we can notice — a late arrival, a birthday, a favorite chair in the shade. Notice is the whole product.',
    ],
  },
]

const menuLinks = [
  { id: 'house', num: '02', label: 'The House' },
  { id: 'rooms', num: '03', label: 'Rooms' },
  { id: 'dining', num: '05', label: 'Kitchen & table' },
  { id: 'journal', num: '06', label: 'Journal' },
]

const railLabels = {
  top: ['01', 'Stay somewhere'],
  house: ['02', 'The House'],
  rooms: ['03', 'Rooms'],
  stay: ['04', 'The stay'],
  dining: ['05', 'Kitchen & table'],
  journal: ['06', 'From the journal'],
  cta: ['07', 'Come stay'],
}

function Folio({ num, label, dark }) {
  return (
    <div className={dark ? 'folio folio-dark' : 'folio'}>
      {num && <span className="folio-num">{num}</span>}
      <span className="folio-label">{label}</span>
      <span className="folio-rule" />
    </div>
  )
}

function Marquee() {
  const group = (
    <div className="marquee-group" aria-hidden="true">
      {marqueeItems.map((item) => (
        <span key={item}>
          {item}
          <span className="marquee-glyph">𓋹</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  )
}

function App() {
  const [overlay, setOverlay] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('top')
  const [article, setArticle] = useState(0)
  const triggerRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const handler = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    const sectionIds = ['house', 'rooms', 'stay', 'dining', 'journal', 'cta']
    const onScroll = () => {
      setScrolled(window.scrollY > 48)
      const bar = progressRef.current
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
      }
      let current = 'top'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = id
      }
      setActiveId(current)
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in')
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in'))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!overlay) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOverlay(null)
        return
      }
      if (event.key !== 'Tab') return
      const root = document.querySelector('[data-overlay]')
      if (!root) return
      const nodes = [...root.querySelectorAll('a[href], button, input, select, textarea')].filter(
        (node) => !node.disabled && node.offsetParent !== null
      )
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const inside = root.contains(document.activeElement)
      if (!inside) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const trigger = triggerRef.current
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      if (trigger && document.contains(trigger)) trigger.focus()
    }
  }, [overlay])

  const openBooking = (event, room = '') => {
    triggerRef.current = event?.currentTarget || document.activeElement
    setSelectedRoom(room)
    setSubmitted(false)
    setOverlay('booking')
  }

  const openMenu = (event) => {
    triggerRef.current = event?.currentTarget || document.activeElement
    setOverlay('menu')
  }

  const openJournal = (event, index) => {
    triggerRef.current = event?.currentTarget || document.activeElement
    setArticle(index)
    setOverlay('journal')
  }

  const closeOverlay = () => setOverlay(null)

  const submitBooking = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const rail = railLabels[activeId] || railLabels.top

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className="progress" ref={progressRef} aria-hidden="true" />
      {activeId !== 'top' && (
        <div className="side-rail" aria-hidden="true">
          <span className="rail-num">{rail[0]}</span>
          <span className="rail-label" key={activeId}>{rail[1]}</span>
        </div>
      )}
      <div className="announcement">A small hotel, made for slower mornings. · Luxor, Egypt</div>

      <header className={`nav-wrap${scrolled ? ' is-fixed' : ''}`}>
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Aurum House home">
            <span className="brand-mark">A</span>
            <span>Aurum House</span>
          </a>
          <div className="nav-links">
            <a href="#rooms" className={activeId === 'rooms' ? 'active' : undefined}>Rooms</a>
            <a href="#house" className={activeId === 'house' ? 'active' : undefined}>The House</a>
            <a href="#dining" className={activeId === 'dining' ? 'active' : undefined}>Dining</a>
            <a href="#journal" className={activeId === 'journal' ? 'active' : undefined}>Journal</a>
          </div>
          <button className="nav-cta" onClick={(event) => openBooking(event)}>Check availability</button>
          <button
            className="burger"
            onClick={(event) => openMenu(event)}
            aria-expanded={overlay === 'menu'}
            aria-controls="site-menu"
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-media">
            <img
              src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=1800&q=88"
              alt="Warmly lit boutique hotel courtyard at dusk"
            />
            <div className="hero-caption">
              <span className="hero-caption-num">01 / 04</span>
              <span>Courtyard at dusk</span>
            </div>
          </div>
          <div className="hero-panel">
            <p className="kicker rise d1">A quiet stay beside the Nile</p>
            <h1 className="rise d2">Stay somewhere<br /><em>worth slowing down for.</em></h1>
            <p className="hero-lede rise d3">
              Aurum House is a twelve-room boutique hotel built around shade, stone, water and the kind of hospitality that remembers your coffee order.
            </p>
            <div className="hero-actions rise d4">
              <button className="btn btn-sand" onClick={(event) => openBooking(event)}>Plan your stay <span aria-hidden="true">↗</span></button>
              <a className="tlink tlink-light" href="#rooms">Explore the rooms <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-note rise d5">
              <span>Open year-round</span>
              <span>12 rooms</span>
              <span>5 min from the west bank</span>
            </div>
          </div>
        </section>

        <Marquee />

        <section className="booking-strip" aria-label="Booking form">
          <div className="booking-inner container">
            <button type="button" className="booking-field" onClick={(event) => openBooking(event)}>
              <span className="field-label">Arrival</span>
              <strong>Choose a date</strong>
            </button>
            <button type="button" className="booking-field" onClick={(event) => openBooking(event)}>
              <span className="field-label">Departure</span>
              <strong>Choose a date</strong>
            </button>
            <button type="button" className="booking-field" onClick={(event) => openBooking(event)}>
              <span className="field-label">Guests</span>
              <strong>2 adults</strong>
            </button>
            <button className="btn btn-gold" onClick={(event) => openBooking(event)}>Check availability</button>
          </div>
        </section>

        <section className="section container" id="house">
          <Folio num="02" label="The House" />
          <div className="intro-grid">
            <div className="reveal">
              <span className="glyph-mark" aria-hidden="true">𓆸</span>
              <h2 className="on-sand">Not a resort.<br /><em>A place with a pulse.</em></h2>
            </div>
            <div className="intro-copy reveal">
              <p className="lead">We kept Aurum House deliberately small. Twelve rooms, one long courtyard, a kitchen that cooks for the table, and enough empty space to make the river feel close.</p>
              <p className="muted-p">Come for Luxor. Stay because by the second morning you stop checking the time.</p>
              <a className="tlink" href="#journal">Read our story <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="band container">
          <div className="band-main reveal">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=88" alt="Elegant hotel exterior framed by palms" />
          </div>
          <div className="band-side">
            <div className="band-arch reveal">
              <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=85" alt="Quiet hotel room with natural textures" />
            </div>
            <p className="band-note reveal">
              <span>The courtyard</span>
              Four palms, one old well, and shade by noon.
            </p>
          </div>
        </section>

        <section className="section container" id="rooms">
          <Folio num="03" label="Rooms" />
          <div className="section-head">
            <div className="reveal">
              <h2 className="on-sand">Choose your<br /><em>kind of quiet.</em></h2>
            </div>
            <p className="reveal">Every room has its own rhythm. Linen, oak, local stone and windows designed to catch the morning light.</p>
          </div>
          <div className="room-grid">
            {rooms.map((room, index) => (
              <article className={`room-${index + 1} reveal`} key={room.name}>
                <div className="room-media">
                  <img src={room.image} alt={room.name} />
                  <span className="room-index">0{index + 1} —</span>
                </div>
                <div className="room-body">
                  <div>
                    <h3>{room.name}</h3>
                    <p className="room-meta">{room.meta}</p>
                  </div>
                  <div className="room-foot">
                    <span className="price">{room.price}</span>
                    <button className="tlink" onClick={(event) => openBooking(event, room.name)}>Reserve <span aria-hidden="true">↗</span></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-band">
          <div className="container quote-inner reveal">
            <span className="quote-glyph" aria-hidden="true">𓂀</span>
            <figure>
              <blockquote>“The luxury is in having nowhere else you need to be.”</blockquote>
              <figcaption>— The House Note</figcaption>
            </figure>
          </div>
        </section>

        <section className="experience" id="stay">
          <div className="experience-media reveal">
            <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=88" alt="Pool beside a tropical hotel garden" />
          </div>
          <div className="experience-panel reveal">
            <Folio num="04" label="The stay" />
            <h2 className="on-sand">Do less.<br /><em>Notice more.</em></h2>
            <div className="experience-list">
              {experiences.map(([number, title, body]) => (
                <div className="experience-item" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="dining">
          <Folio num="05" label="Kitchen & table" />
          <div className="dining-grid">
            <div className="dining-copy reveal">
              <h2 className="on-sand">Eat like you<br /><em>live here.</em></h2>
              <p className="lead">Our kitchen follows the market rather than a calendar. Bread still arrives warm, vegetables are bought close to home, and dinner is served when it is ready.</p>
              <div className="detail-list">
                <div><span>Breakfast</span><strong>07:00 — 11:00</strong></div>
                <div><span>Dinner</span><strong>18:30 — 22:30</strong></div>
                <div><span>Bar</span><strong>Until midnight</strong></div>
              </div>
            </div>
            <div className="dining-photo reveal">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=88" alt="Elegant dining room with warm evening light" />
            </div>
          </div>
        </section>

        <section className="section container" id="journal">
          <Folio num="06" label="From the journal" />
          <div className="section-head">
            <div className="reveal">
              <h2 className="on-sand">A few things<br /><em>worth knowing.</em></h2>
            </div>
            <a className="tlink" href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </div>
          <div className="journal-grid">
            {posts.map((post, index) => (
              <article className="reveal" key={post.num}>
                <span className="j-label">{post.label}</span>
                <h3>{post.title}</h3>
                <p>{post.blurb}</p>
                <button className="j-link" onClick={(event) => openJournal(event, index)}>Read note →</button>
              </article>
            ))}
          </div>
        </section>

        <section className="cta" id="cta">
          <div className="container cta-inner">
            <div className="reveal">
              <Folio num="07" label="Come stay" dark />
              <h2>Your room is<br /><em>waiting quietly.</em></h2>
            </div>
            <button className="btn btn-gold large reveal" onClick={(event) => openBooking(event)}>Check availability <span aria-hidden="true">↗</span></button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#top"><span className="brand-mark">A</span><span>Aurum House</span></a>
            <p>West Bank, Luxor<br />Egypt</p>
          </div>
          <div className="footer-links">
            <a href="#rooms">Rooms</a>
            <a href="#house">The House</a>
            <a href="#dining">Dining</a>
            <a href="#journal">Journal</a>
          </div>
          <div className="footer-contact">
            <a href="mailto:stay@aurumhouse.example">stay@aurumhouse.example</a>
            <a href="tel:+201000000000">+20 100 000 0000</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Aurum House</span>
          <span>Made for slow stays.</span>
        </div>
      </footer>

      {overlay === 'booking' && (
        <div className="modal-backdrop" data-overlay role="presentation" onMouseDown={closeOverlay}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-label="Check availability" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeOverlay} aria-label="Close" autoFocus>×</button>
            {!submitted ? (
              <>
                <Folio label="Your stay" />
                <h2>Check availability.</h2>
                <p className="modal-lede">Tell us when you are coming and we’ll shape the stay around you.</p>
                <form onSubmit={submitBooking}>
                  <label>Room
                    <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                      <option value="">Any room</option>
                      {rooms.map((room) => <option key={room.name}>{room.name}</option>)}
                    </select>
                  </label>
                  <div className="form-row">
                    <label>Arrival<input type="date" required /></label>
                    <label>Departure<input type="date" required /></label>
                  </div>
                  <div className="form-row">
                    <label>Guests<select defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4+</option></select></label>
                    <label>Email<input type="email" placeholder="you@example.com" required /></label>
                  </div>
                  <button className="btn btn-gold full" type="submit">Send availability request <span aria-hidden="true">↗</span></button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <span className="success-symbol">✓</span>
                <Folio label="Request received" />
                <h2>We'll be in touch.</h2>
                <p>For a production site, this form can connect directly to the hotel’s booking engine, CRM, email or WhatsApp workflow.</p>
                <button className="btn btn-gold" onClick={closeOverlay}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {overlay === 'menu' && (
        <div className="menu-overlay" id="site-menu" data-overlay role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="menu-head">
            <span className="brand"><span className="brand-mark">A</span><span>Aurum House</span></span>
            <button className="modal-close" onClick={closeOverlay} aria-label="Close menu" autoFocus>×</button>
          </div>
          <nav className="menu-links" aria-label="Menu">
            {menuLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeOverlay}
                className="rise"
                style={{ animationDelay: `${0.06 + index * 0.07}s` }}
              >
                <span className="menu-num">{link.num}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="menu-foot">
            <button className="btn btn-gold" onClick={(event) => openBooking(event)}>Check availability</button>
            <p>West Bank, Luxor · stay@aurumhouse.example</p>
          </div>
        </div>
      )}

      {overlay === 'journal' && (
        <div className="journal-sheet" data-overlay role="dialog" aria-modal="true" aria-label={posts[article].title}>
          <div className="sheet-head container">
            <Folio num={posts[article].num} label={posts[article].kind} />
            <button className="modal-close" onClick={closeOverlay} aria-label="Close article" autoFocus>×</button>
          </div>
          <article className="sheet-article">
            <p className="sheet-date">{posts[article].date}</p>
            <h2>{posts[article].title}</h2>
            <p className="sheet-body sheet-drop">{posts[article].body[0]}</p>
            {posts[article].body.slice(1).map((paragraph, index) => (
              <p className="sheet-body" key={index}>{paragraph}</p>
            ))}
            <button className="tlink" onClick={closeOverlay}>Back to the journal <span aria-hidden="true">↑</span></button>
          </article>
        </div>
      )}
    </div>
  )
}

export default App
