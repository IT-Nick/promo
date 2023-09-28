import Image from 'next/image'
import styles from './page.module.css'
import './globals.css'
import './shaders-on-scroll.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.frame}>
        <div className={styles.frame__titleWrap}>
          <h1 className={styles.frame__title}>Smooth WebGL Shader Transformations on Scroll</h1>
        </div>
        <nav className={styles.frame__links}>
          <a href="https://tympanus.net/Tutorials/MarqueeMenu/">Previous demo</a>
          <a href="https://tympanus.net/codrops/?p=55223">Article</a>
          <a href="https://github.com/Faboolea/shaders-on-scroll">GitHub</a>
        </nav>
      </div>
      <div className={styles.content}>
        <div className={styles.scroll__stage}>
          <div className={styles.scroll__content}>
            <section className="section">
              <div className="section__title">
                <h1 className="section__title-number">01</h1>
                <h2 className="section__title-text">Logma</h2>
                <p className="section__title-arrow">
                  <span>➤</span>
                    <span>➤</span>
                </p>
              </div>
              <p className="section__paragraph">
                The fireball that we rode was moving –
                But now we ve got a new machine –
                They got music in the solar system
                  <a href="https://dimorph.ch/" className="section__button">Discover</a>
              </p>
            </section>
            <section className="section">
              <div className="section__title">
                <h1 className="section__title-number">02</h1>
                <h2 className="section__title-text">Naos</h2>
              </div>
              <p className="section__paragraph">
                Let me take you on a little trip –
                We re gonna travel faster than light –
                And you ll go anywhere you want to decide
                  <a href="https://dimorph.ch/" className="section__button">Discover</a>
              </p>
            </section>
            <section className="section">
              <div className="section__title">
                <h1 className="section__title-number">03</h1>
                <h2 className="section__title-text">Chara</h2>
              </div>
              <p className="section__paragraph">
                Close your eyes now –
                And give in to the night –
                Soar above the stars –
                Forget what s behind
                  <a href="https://dimorph.ch/" className="section__button">Discover</a>
              </p>
            </section>                
            </div>
        </div>
        <div className={styles.layout__line}></div>
        <div className={styles.layout__faboolea}>
          <a className={styles.layout__fabooleaLink} href="https://twitter.com/faboolea">Made by &nbsp; ꜰᴀʙᴏᴏʟᴇᴀ</a>
        </div>
      </div>
    </main>
  )
}
