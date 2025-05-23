function About() {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex items-center gap-6">
        <img src="/howWorks.png" alt="" />
        <div className="flex flex-col  gap-2">
          <div className="h3 ">Як працює Help Volunteer?</div>
          <div className="h4Nb">
            <div>
              На нашій платформі кожен може швидко і просто залишити заявку на
              допомогу. Далі ми забезпечуємо прозору та надійну систему
              взаємодії між заявниками і волонтерами:
            </div>
            <ol className="list-decimal pl-6">
              <li>
                <div className="h4">Подання заявки</div>
                <div>
                  Людина, яка потребує допомоги, проходить реєстрацію та
                  заповнює форму: описує ситуацію, вказує потреби, контакти та
                  локацію.
                </div>
              </li>
              <li>
                <div className="h4">Перевірка заявки</div>
                <div>
                  {" "}
                  Наша команда модераторів перевіряє дані на достовірність.
                </div>
              </li>
              <li>
                <div className="h4">Публікація в системі</div>
                <div> Після перевірки заявка з’являється на платформі.</div>
              </li>
              <li>
                <div className="h4">Дії волонтерів</div>
                <div>
                  Волонтери переглядають відкриті заявки у своєму регіоні чи
                  категорії допомоги та обирають ті, які можуть виконати.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="h4Nb">
        <span className="h3">Ми — платформа для координації</span>
        <div>
          Help Volunteer — це не фонд і не служба доставки, а зручна
          інфраструктура для зв’язку між тими, хто потребує допомоги, і тими,
          хто готовий діяти. Кожен крок прозорий, зафіксований і підконтрольний.
          Разом ми створюємо ефективну, перевірену мережу підтримки.
        </div>
      </div>
    </div>
  );
}

export default About;
