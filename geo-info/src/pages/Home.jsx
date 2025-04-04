import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import geo1 from "../assets/images/geo1.jpg";
import geo2 from "../assets/images/geo2.jpg";
import geo3 from "../assets/images/geo3.jpg";

const images = [geo1, geo2, geo3];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <header className="absolute w-full bg-white flex justify-around items-center p-5  z-50">
        <h1 className="text-3xl font-bold text-[#052c46]">ГеоИнфо</h1>

        {/* Десктопное меню */}
        <nav className="hidden md:flex space-x-8">
          <a href="/map" className="text-black text-2xl font-medium hover:text-blue-700">Карта</a>
          <a href="/upload" className="text-black text-2xl font-medium hover:text-blue-700">Загрузка</a>
          <a href="/analysis" className="text-black text-2xl font-medium hover:text-blue-700">Анализ</a>
          <a href="/library" className="text-black text-2xl font-medium hover:text-blue-700">Учебные материалы</a>
        </nav>

        {/* Гамбургер-меню */}
        <div >
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-black">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-6 md:hidden z-40">
          <a href="/map" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Карта</a>
          <a href="/upload" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Загрузка</a>
          <a href="/analysis" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Анализ</a>
          <a href="/library" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Учебные материалы</a>
        </div>
      )}

      {/* Карусель на весь экран */}
      <div className="relative w-full h-screen">
        <Swiper
          modules={Autoplay}
          spaceBetween={0}
          slidesPerView={1}
          // navigation
          // pagination={{ clickable: false }}
          autoplay={{ delay: 30000 }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
                  <h2 className="text-3xl font-bold md:text-7xl">Геоинформационный сайт</h2>
                  <p className="mt-4 text-2xl">Инструменты для анализа спутниковых снимков и геопространственных данных</p>
                  <div className="flex flex-wrap justify-center gap-4 mt-6 md:mt-6">
                    <button onClick={() => window.location.href = "/map"} className="bg-blue-600 text-2xl text-white w-100 px-6 py-3 rounded hover:bg-blue-700">Открыть карту</button>
                    <button onClick={() => window.location.href = "/upload"} className="bg-blue-600 text-2xl text-white w-100 px-6 py-3 rounded hover:bg-blue-700">Загрузить снимок</button>
                    <button onClick={() => window.location.href = "/analysis"} className="bg-blue-600 text-2xl text-white w-100 px-6 py-3 rounded hover:bg-blue-700">Анализ данных</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Футер на всю ширину (но не высоту экрана) */}
      <footer className="w-full bg-white text-black py-10">
  <div className="w-full max-w-screen-2xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 className="text-xl font-bold">О проекте</h3>
        <p className="text-black mt-2">
          ГеоИнфо — сервис для анализа спутниковых снимков и геопространственных данных.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold">Контакты</h3>
        <p className="text-black">example@example.com</p>
        <p className="text-black">+7 (123) 455-75-80</p>
      </div>

      <div>
        <h3 className="text-xl font-bold">Документы</h3>
        <a href="#" className="text-black hover:underline">
          Политика конфиденциальности
        </a>
      </div>

      <div>
        <h3 className="text-xl font-bold">Мы в соцсетях</h3>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://t.me/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500 text-2xl"
            aria-label="Telegram"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-500 text-2xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-red-600 text-2xl"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>

    <hr className="mt-8" />

    <div className="text-black text-center mt-6">
      © 2025 ГеоИнфо. Все права защищены.
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;
