import React, { useState } from 'react';
// Импортируем фото Арсена. Убедись, что файл arsen.png лежит в src/assets/
import arsenPhoto from './assets/arsen.jpg'; 

// --- 1. ДОБАВИЛИ ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ (Их не было в коде) ---
const InputField = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#B7FF2F] outline-none transition-all text-white placeholder:text-gray-700" 
    />
  </div>
);


const FileField = ({ label, hasInstruction, instrKey, onShowInstruction }) => (
  <div className="flex items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10">
    <div>
      <p className="font-bold text-white">{label}</p>
      {hasInstruction && (
        <button 
          onClick={() => onShowInstruction(instrKey)}
          className="text-[#B7FF2F] text-[10px] font-bold uppercase underline mt-1"
        >
          Инструкция
        </button>
      )}
    </div>
    <input type="file" className="text-xs text-gray-500 file:bg-[#B7FF2F] file:text-black file:border-0 file:px-4 file:py-2 file:rounded-full file:mr-4 file:font-bold cursor-pointer" />
  </div>
);

function App() {
  // --- 2. ДОБАВИЛИ НЕДОСТАЮЩИЕ СОСТОЯНИЯ ---
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('personal'); // Для вкладок в заявке
  const [modalContent, setModalContent] = useState(null); // Для модального окна
  const [isLoggedIn, setIsLoggedIn] = useState(false); // По умолчанию — не залогинен


  const programs = [
    { tag: 'Наука', title: 'Креативная инженерия', desc: 'Программа предназначена для тех, кто будет формировать будущее технологий...', связка: 'Математика + Физика' },
    { tag: 'Технологии', title: 'Инновационные цифровые продукты и сервисы', desc: 'Программа учит превращать идеи в цифровые продукты, которые действительно нужны людям...', связка: 'Математика + Информатика' },
    { tag: 'Общество', title: 'Социология инноваций и лидерства', desc: 'Программа подходит тем, кто стремится понять людей, их истории, традиции...', связка: 'Математика + География' },
    { tag: 'Законодательные реформы', title: 'Стратегии государственного управления и развития', desc: 'Программа рассчитана на студентов, которые хотят влиять на развитие городов и регионов...', связка: 'Математика + География' },
    { tag: 'Искусство + медиа', title: 'Цифровые медиа и маркетинг', desc: 'Программа готовит специалистов по коммуникациям с навыками в журналистике, медиапроизводстве...', связка: 'История Казахстана + Грамотность чтения + 2 творческих экзамена' },
  ];

  const instructions = {
    presentation: {
      title: "Инструкция: Видеопрезентация",
      body: (
        <div className="space-y-0 text-sm text-gray-300">
          <p>Мы хотели бы познакомиться с вами поближе! Пожалуйста, запишите и отправьте короткое видео, в котором вы ответите на вопросы ниже. В видео вы должны говорить прямо в камеру (в стиле «говорящей головы»). При желании вы также можете включить простую презентацию.</p>
          <p className="font-bold text-white">Рекомендации по видеомонтажу:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Длина до 5 минут </li>
            <li>Язык Английский </li>
          </ul>
          <p className="font-bold text-white">Критерии оценки:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Мотивация </li>
            <li>Лидерский потенциал </li>
            <li>Креативность и структура вашего видео</li>
          </ul>
          <p className="font-bold text-white">Вопросы:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Why are you applying to inVision U?</li>
            <li>Which program are you interested in and why?</li>
            <li>What major challenge have you overcome, and what helped you through it?</li>
            <li>What are your long-term goals, and how will this program help you reach them? What motivates you in your life?</li>
            <li>What does being a leader mean to you? Could you share an example of a time you showed leadership?</li>
            <li>Does your family support your decision to join inVision U? Who is your biggest source of encouragement?</li>
          </ul>
        </div>
      )
    },
    portfolio: {
      title: "Инструкция: Творческое Портфолио",
      body: (
        <div className="space-y-0 text-sm text-gray-300">
          <p>Портфолио демонстрирует ваши творческие и технические способности. Включите 3-4 лучших проекта, которые, по вашему мнению, наилучшим образом отражают ваши навыки и интересы. Формат PDF, до 10 страниц.</p>
          <p className="font-bold text-white">Каждый проект должен включать в себя:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Визуальное представление вашей работы (фотографии, эскизы, рендеры, диаграммы, коллажи и т. д.) </li>
            <li>Краткое описание, объясняющее концепцию, процесс и результат. </li>
            <li>Уточнение по поводу авторства: Если проект был выполнен в составе группы, не могли бы вы указать, какие части вы выполнили лично?</li>
          </ul>
          <p className="font-bold text-white">Ваше портфолио помогает нам понять ваше дизайнерское мышление, креативность и подход к решению проблем.</p>
        </div>
      )
    }
  };

  const Navbar = () => (
    <nav className="border-b border-gray-900 p-6 flex justify-between items-center bg-black sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <div className="w-8 h-8 bg-[#B7FF2F] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(183,255,47,0.3)]">
          <span className="text-black font-black text-xs">iU</span>
        </div>
        <span className="text-xl font-black uppercase tracking-tighter italic text-white">inVision U</span>
      </div>
      
      <div className="flex gap-8 items-center">
        <div className="hidden md:flex gap-8 mr-4">
          {['Бакалавриат', 'Контакты', 'О нас'].map((item) => (
            <button 
              key={item}
              onClick={() => setCurrentPage(item.toLowerCase())}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
                currentPage === item.toLowerCase() ? 'text-[#B7FF2F]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border-l border-gray-800 ml-4 pl-4">
          {['EN', 'KZ', 'RU'].map((lang) => (
            <button key={lang} className={`text-[10px] font-bold px-2 py-1 transition-colors ${lang === 'RU' ? 'text-white' : 'text-gray-600 hover:text-white'}`}>
              {lang}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="border-t border-gray-900 bg-[#080808] mt-24 py-16 px-6 text-gray-500 text-sm">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Навигация</h4>
          <p className="cursor-pointer hover:text-white">Foundation</p>
          <p className="cursor-pointer hover:text-white" onClick={() => setCurrentPage('бакалавриат')}>Бакалавриат</p>
          <p className="cursor-pointer hover:text-white">Политика приватности</p>
        </div>
        <div className="col-span-2 space-y-2">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Свяжитесь с нами</h4>
          <p className="text-2xl text-white font-bold">+7 771 070 73 70</p>
          <p>info@invisionu.education</p>
          <p>Кампус: ул. Каныша Сатпаева, 22/1</p>
        </div>
        <div className="text-right space-y-1 text-xs">
          <p>© 2025 inVision U. Все права защищены.</p>
          <p>GIGABYTE Team // Kokshetau IT-Lyceum</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#B7FF2F] selection:text-black">
      <Navbar />

      <main className="animate-fadeIn">
        {currentPage === 'home' && (
          <div className="max-w-6xl mx-auto pt-20 px-6 pb-20">
            <div className="grid md:grid-cols-2 gap-16 items-center relative">
              <div className="relative z-10">
                {/* ИСПРАВЛЕНИЕ: Сдвинули заголовок, чтобы буква Т не заходила под лого */}
                <h1 className="text-7xl font-black leading-[0.95] mb-8 italic uppercase ml-2 tracking-tighter">
                  Будущее <br /> 
                  <span className="text-[#B7FF2F]">принадлежит</span> <br /> 
                  лидерам
                </h1>
                <p className="text-gray-400 text-lg mb-10 max-w-md ml-2">
                  inVision U — инновационный университет от inDrive. Мы ищем не просто студентов, а будущих создателей проектов.
                </p>
                <button 
                  onClick={() => {
                    if (isLoggedIn) {
                      setCurrentPage('apply'); // Если залогинен — сразу к заявке
                      } else {
                      setCurrentPage('auth');  // Если нет — на страницу входа/регистрации
                      }
                    }} 
                     className="bg-[#B7FF2F] text-black font-black px-10 py-5 rounded-2xl text-xl uppercase italic hover:shadow-[0_0_30px_rgba(183,255,47,0.3)] transition-all ml-2">
                    Подать заявку
                </button>
              </div>
              <div className="w-full h-[500px] bg-gray-900 rounded-[3rem] border border-gray-800 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-[#B7FF2F] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity"></div>
                <span className="text-[200px] opacity-10 font-black italic group-hover:opacity-20 transition-opacity">iU</span>
              </div>
            </div>
          </div>
        )}
        {currentPage === 'auth' && (
  <div className="max-w-md mx-auto py-20 px-6 animate-fadeIn">
    <div className="bg-[#0A0A0A] border border-gray-900 p-10 rounded-[2.5rem] shadow-2xl">
      <h2 className="text-3xl font-black uppercase italic mb-2 text-white text-center">Войти в iU</h2>
      <p className="text-gray-500 text-center text-sm mb-10">Добро пожаловать в университет будущего</p>
      
      <div className="space-y-6">
        <InputField label="Email адрес" placeholder="your@email.com" />
        <InputField label="Пароль" placeholder="••••••••" type="password" />
        
        <button 
          onClick={() => {
            setIsLoggedIn(true);      // Имитируем вход
            setCurrentPage('apply');  // Перекидываем на заявку
          }}
          className="w-full bg-[#B7FF2F] text-black font-black py-4 rounded-2xl uppercase italic hover:shadow-[0_0_20px_rgba(183,255,47,0.2)] transition-all"
        >
          Войти
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0A0A0A] px-2 text-gray-500 font-bold">Или через</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-800 p-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold">
             Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-800 p-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold">
             Apple
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Нет аккаунта? <button className="text-[#B7FF2F] font-bold hover:underline">Создать сейчас</button>
        </p>
      </div>
    </div>
  </div>
)}
        {currentPage === 'бакалавриат' && (
          <div className="max-w-6xl mx-auto py-20 px-6 space-y-24">
            
            {/* Направления */}
            <section>
              <h2 className="text-5xl font-black mb-16 uppercase italic text-center">Основные направления</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programs.map((p, i) => (
                  <div key={i} className="bg-[#0A0A0A] p-10 rounded-[2rem] border border-gray-900 hover:border-[#B7FF2F] transition-all group">
                    <span className="text-[10px] text-[#B7FF2F] font-mono uppercase tracking-widest border border-[#B7FF2F]/20 px-3 py-1 rounded-full">{p.tag}</span>
                    <h3 className="text-2xl font-bold mt-5 mb-4 text-white group-hover:text-[#B7FF2F] transition-colors">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                    <p className="text-xs text-gray-700 mt-6 font-mono">Предметы ЕНТ: {p.связка}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-[#B7FF2F] text-black rounded-[3rem] p-16 grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-4xl font-black uppercase mb-10 italic">Этапы поступления</h3>
                <ol className="space-y-6 list-decimal list-inside font-bold text-lg">
                  <li>Заполнить форму и загрузить документы</li>
                  <li>Записать видео с ответами на вопросы</li>
                  <li>Загрузить результаты ЕНТ и тестов по английскому</li>
                  <li>Пройти собеседование с приёмной комиссией</li>
                  <li>Получить приглашение на обучение</li>
                  <li>Приступить к занятиям</li>
                </ol>
              </div>
              <div className="space-y-10">
                <div>
                  <h3 className="text-4xl font-black uppercase mb-6 italic">Сроки</h3>
                  <p className="text-xl">Ранняя подача: <span className="font-bold">до 24 декабря 2025</span></p>
                  <p className="text-xl">Основная: <span className="font-bold">с 12 марта по 30 мая 2026</span></p>
                </div>
                <div>
                  <h3 className="text-4xl font-black uppercase mb-6 italic">Мин. требования</h3>
                  <ul className="space-y-3 list-disc list-inside text-lg">
                    <li>ЕНТ: <span className="font-bold">80 баллов</span> (для РК)</li>
                    <li>Английский: <span className="font-bold">IELTS 6.0</span> / Duolingo 105</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
        )}

        {currentPage === 'контакты' && (
          <div className="max-w-4xl mx-auto py-20 px-6 text-center">
            <h2 className="text-5xl font-black mb-12 uppercase italic">Свяжитесь с нами</h2>
            <div className="space-y-4 text-3xl font-bold">
              <p>info@invisionu.education</p>
              <p className="text-[#B7FF2F]">+7 771 070 73 70</p>
              <p className="text-gray-600 text-sm uppercase tracking-widest mt-16">Кампус: ул. Каныша Сатпаева, 22/1 (Алматы)</p>
            </div>
          </div>
        )}

        {currentPage === 'apply' && (
          <div className="max-w-6xl mx-auto py-16 px-6 relative">
            <h1 className="text-5xl font-black mb-12 uppercase italic text-center">Портал <span className="text-[#B7FF2F]">абитуриента</span></h1>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-4">
                {[{ id: 'personal', label: 'Данные' }, { id: 'contact', label: 'Контакты' }, { id: 'education', label: 'Образование' }].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-8 rounded-[2rem] border transition-all ${
                      activeTab === tab.id ? 'bg-[#B7FF2F] text-black border-[#B7FF2F]' : 'bg-[#0A0A0A] border-white/10 text-white'
                    }`}
                  >
                    <p className="font-black uppercase tracking-tighter text-xl">{tab.label}</p>
                  </button>
                ))}
              </div>

              <div className="md:w-2/3 bg-[#0A0A0A] border border-gray-900 rounded-[3rem] p-12 min-h-[500px]">
                {activeTab === 'personal' && (
                  <div className="space-y-10 animate-fadeIn">
                    <h3 className="text-3xl font-black uppercase italic border-b border-white/5 pb-6 text-[#B7FF2F]">Личные данные</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Фамилия" placeholder="Булат" />
                      <InputField label="Имя" placeholder="Әбілмансұр" />
                      <InputField label="Отчество" placeholder="Аманұлы" />
                      <InputField label="Дата рождения" placeholder="ДД.ММ.ГГГГ" />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic border-b border-white/5 pb-6 text-[#B7FF2F]">Гражданство и паспортные данные</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Гражданство " />
                      <InputField label="Индивидуальный идентификационный номер (ИИН) "  />
                      <InputField label="Номер документа "  />
                      <InputField label="Дата выдачи" placeholder="ДД.ММ.ГГГГ" />
                    </div>
                    <div className="grid grid-cols-20 gap-4">
                      <FileField label="Копия вашего удостоверения личности"  instrKey="portfolio" onShowInstruction={(key) => setModalContent(instructions[key])} />
                    </div>
                  </div>
                )}
                {activeTab === 'contact' && (
                  <div className="space-y-8 animate-fadeIn">
                    <h3 className="text-3xl font-black uppercase italic border-b border-white/5 pb-6 text-[#B7FF2F]">Домашний адрес</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Страна " />
                      <InputField label="Регион "  />
                      <InputField label="Город "  />
                      <InputField label="Улица "  />
                      <InputField label="Дом "  />
                      <InputField label="Квартира "  />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic border-b border-white/5 pb-6 text-[#B7FF2F]">Контактная информация</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Номер мобильного телефона  " />
                      <InputField label="Instagram "  />
                      <InputField label="Telegram "  />
                      <InputField label="WhatsApp "  />
                    </div>
                  </div>
                )}
                {activeTab === 'education' && (
                  <div className="space-y-8 animate-fadeIn">
                    <h3 className="text-3xl font-black uppercase italic border-b border-white/5 pb-6 text-[#B7FF2F]">Файлы</h3>
                    <div className="space-y-6">
                      <FileField label="Видеопрезентация" hasInstruction={true} instrKey="presentation" onShowInstruction={(key) => setModalContent(instructions[key])} />
                      <FileField label="Портфолио (PDF)" hasInstruction={true} instrKey="portfolio" onShowInstruction={(key) => setModalContent(instructions[key])} />
                      <FileField label="Результаты проверки уровня владения английским языком"  instrKey="portfolio" onShowInstruction={(key) => setModalContent(instructions[key])} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'о нас' && (
          <div className="max-w-5xl mx-auto py-20 px-6">
            <h2 className="text-5xl font-black mb-16 uppercase italic text-center">О нас</h2>
            
            <div className="grid md:grid-cols-3 gap-12 items-center bg-[#0A0A0A] p-12 rounded-[3rem] border border-gray-900 shadow-xl">
              <div className="md:col-span-1 flex justify-center">
                {/* Фото Арсена в круглой рамке */}
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#B7FF2F] shadow-[0_0_30px_rgba(183,255,47,0.3)]">
                  <img src={arsenPhoto} alt="Арсен Томский" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-8">
                {/* Цитата справа */}
                <blockquote className="text-3xl font-bold leading-snug italic text-white relative">
                  <span className="text-8xl text-[#B7FF2F]/20 absolute -top-10 -left-8 font-serif">“</span>
                  Успех — это не достижение конечной цели, а путь в верном направлении.
                </blockquote>
                {/* Информация о спонсорстве */}
                <p className="text-gray-400 text-lg border-l-2 border-gray-800 pl-6">
                  inVision U основан и спонсируется Арсеном Томским, основателем и генеральным директором inDrive. Мы боремся с неравным распределением возможностей и знаний.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- МОДАЛЬНОЕ ОКНО --- */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-[#111] border border-[#B7FF2F]/40 max-w-2xl w-full rounded-[2.5rem] overflow-hidden">
            <div className="p-10 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic text-[#B7FF2F]">{modalContent.title}</h2>
              <button onClick={() => setModalContent(null)} className="text-white/50 hover:text-white text-4xl">×</button>
            </div>
            <div className="p-10">{modalContent.body}</div>
            <div className="p-8 text-center"><button onClick={() => setModalContent(null)} className="bg-[#B7FF2F] text-black font-black px-12 py-3 rounded-full uppercase">Понятно</button></div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;