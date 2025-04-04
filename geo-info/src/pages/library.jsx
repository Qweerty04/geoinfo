import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";
import geo1 from "../assets/images/geo1.jpg";
import geo2 from "../assets/images/geo2.jpg";
import geo3 from "../assets/images/geo3.jpg";

const EducationalMaterials = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Данные для материалов
  const materials = [
    {
      title: "Введение в спутниковые снимки",
      description: "Основы работы с спутниковыми изображениями. Обзор типов данных и методов их обработки.",
      fullDescription: "В этом уроке мы изучим основы работы с спутниковыми снимками, включая различные типы снимков, их использование в различных сферах, и методы обработки этих данных для аналитических целей. Примеры реальных приложений.",
      images: [geo1, geo2], // Путь к изображениям
    },
    {
      title: "Геопространственные данные",
      description: "Знакомство с различными типами геопространственных данных и их использованием.",
      fullDescription: "В этом разделе рассматриваются типы геопространственных данных, методы их анализа, включая работу с картами, сетями, а также методы их визуализации.",
      images: [geo1, geo3],
    },
    {
      title: "Продвинутые методы анализа",
      description: "Углубленное изучение методов анализа спутниковых данных с применением алгоритмов машинного обучения.",
      fullDescription: "Этот курс включает в себя более сложные методы анализа данных, включая применение алгоритмов машинного обучения и искусственного интеллекта для обработки спутниковых снимков и геопространственных данных.",
      images: [geo2, geo3],
    },
  ];

  // Открыть модальное окно
  const openModal = (material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMaterial(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <header className="absolute w-full bg-white flex justify-around items-center p-5 z-50">
        <h1 className="text-3xl font-bold text-[#052c46]">ГеоИнфо</h1>

        {/* Десктопное меню */}
        <nav className="hidden md:flex space-x-8">
        <a href="/" className="text-black text-2xl font-medium hover:text-blue-700">Главное</a>
          <a href="/map" className="text-black text-2xl font-medium hover:text-blue-700">Карта</a>
          <a href="/upload" className="text-black text-2xl font-medium hover:text-blue-700">Загрузка</a>
          <a href="/analysis" className="text-black text-2xl font-medium hover:text-blue-700">Анализ</a>
          
        </nav>

        {/* Гамбургер-меню */}
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-black">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-6 md:hidden z-40">
          <a href="/" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Главное</a>
          <a href="#" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Карта</a>
          <a href="#" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Загрузка</a>
          <a href="/analysis" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Анализ</a>
        </div>
      )}

      {/* Основной контент страницы Учебных материалов */}
      <div className="w-full py-12 bg-gray-100 mt-24"> {/* Отступ сверху для контента */}
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Учебные материалы</h2>
          <p className="mt-4 text-lg text-center">
            Ознакомьтесь с обучающими материалами по анализу спутниковых снимков и геопространственных данных.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Карточка учебного материала */}
            {materials.map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold">{material.title}</h3>
                <p className="mt-2 text-lg text-gray-600">{material.description}</p>
                <button
                  onClick={() => openModal(material)}
                  className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
                >
                  Читать больше
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно с полной информацией */}
      {isModalOpen && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-11/12 md:w-2/3">
            <button onClick={closeModal} className="absolute top-4 right-4 text-3xl text-gray-500">
              &times;
            </button>
            <h3 className="text-3xl font-semibold">{selectedMaterial.title}</h3>
            <p className="mt-4 text-lg text-gray-600">{selectedMaterial.fullDescription}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedMaterial.images.map((image, index) => (
                <img key={index} src={image} alt={`image-${index + 1}`} className="w-full h-auto rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      )}

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

export default EducationalMaterials;
