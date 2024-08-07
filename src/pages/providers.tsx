'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Provider } from '../interfaces';
import HomeClientSection from "../app/client-components/HomeClientSection";

export default function Providers() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('/api/providers');
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
    fetchProviders();
  }, []);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
    
  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
    
  const filteredProviders = providers.filter((provider) => {
    const hasSelectedTags = selectedTags.length === 0 || selectedTags.every((tag) => provider.tags.includes(tag));
    const matchesSearchQuery =
    searchQuery === '' ||
    provider.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.contact.phone.replace(/[^0-9]/g, '').includes(searchQuery.replace(/[^0-9]/g, '')) ||
    provider.contact.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.other.toLowerCase().includes(searchQuery.toLowerCase());
    return hasSelectedTags && matchesSearchQuery;
  });
    
  const allTags = Array.from(new Set(providers.flatMap((provider) => provider.tags)));
    
  const handlePrevImage = (providerId: string) => {
    setCurrentImageIndex((prevState) => ({
    ...prevState,
    [providerId]: (prevState[providerId] || 0) - 1,
    }));
  };
      
  const handleNextImage = (providerId: string, totalImages: number) => {
    setCurrentImageIndex((prevState) => ({
    ...prevState,
    [providerId]: (prevState[providerId] || 0) + 1,
    }));
  };
      
  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
  };
      
  const handleCloseModal = () => {
    setSelectedProvider(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="bg-black-800 shadow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <div className="flex justify-center">
              <Link href="/" legacyBehavior>
                <a>
                  <Image src="/transparent.png" alt="RAAO Logo" width={128} height={128} />
                </a>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <HomeClientSection />
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10 flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Providers</h1>
          <div className="lg:flex">
            <div className="lg:w-1/4 lg:mr-8 mb-8 lg:mb-0 lg:sticky lg:top-0 lg:self-start">
              <h2 className="text-xl font-bold mb-4">Filter by Tags</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-transparent text-gray-300 border-gray-300 hover:bg-gray-800 hover:border-gray-400'
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="relative mt-6">
                <label htmlFor="search" className="block text-xl font-bold mb-2">
                  Search Providers
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Search providers..."
                  className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider._id}
                    className="group rounded-lg border border-gray-700 bg-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleProviderClick(provider)}
                  >
                    <h2 className="text-xl font-semibold mb-3 truncate">
                      {provider.name}{" "}
                      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                      </span>
                    </h2>
                    <div className="relative mb-4 overflow-hidden">
                      {provider.img && provider.img.length > 0 && (
                        <Image
                          src={provider.img[currentImageIndex[provider._id] || 0]}
                          alt={provider.name}
                          width={300}
                          height={200}
                          layout="responsive"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      )}
                    </div>
                    <p className="text-gray-300 mb-4 text-sm opacity-50">
                      {provider.desc.length > 150
                        ? `${provider.desc.slice(0, 150)}...`
                        : provider.desc}
                    </p>
                    <p className="text-gray-300 text-sm opacity-50 break-all">
                      {provider.other}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedProvider && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 bg-opacity-80 rounded-lg p-6 max-w-4xl w-full mx-4 sm:mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedProvider.name}</h2>
              <button
                className="text-gray-300 hover:text-white focus:outline-none hidden sm:block"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <div className="mb-6 relative">
              <div className="relative">
                {selectedProvider.img && selectedProvider.img.length > 0 && (
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={selectedProvider.img[currentImageIndex[selectedProvider._id] || 0]}
                      alt={selectedProvider.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                {selectedProvider.img && selectedProvider.img.length > 1 && (
                  <>
                    <button
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded-full focus:outline-none"
                      onClick={() => handlePrevImage(selectedProvider._id)}
                      disabled={currentImageIndex[selectedProvider._id] === 0}
                    >
                      &lt;
                    </button>
                    <button
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded-full focus:outline-none"
                      onClick={() => handleNextImage(selectedProvider._id, selectedProvider.img.length)}
                      disabled={currentImageIndex[selectedProvider._id] === selectedProvider.img.length - 1}
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>
              <div className="flex sm:hidden justify-center mt-4">
                <button
                  className="text-gray-300 hover:text-white focus:outline-none border border-gray-500 rounded-md px-4 py-2"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-gray-300">{selectedProvider.desc}</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">Contact</h3>
                <p>Phone: {selectedProvider.contact.phone}</p>
                <p>Email: {selectedProvider.contact.email}</p>
                <p>Address: {selectedProvider.contact.address}</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProvider.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">Other Information</h3>
                <p className="text-gray-300">
                  {selectedProvider.other.startsWith('http') ? (
                    <a
                      href={selectedProvider.other}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {selectedProvider.other}
                    </a>
                  ) : (
                    selectedProvider.other
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="text-gray-500 py-4 text-sm backdrop-blur-md mt-auto">
        <div className="container mx-auto text-center">
          <p>
            &copy; Copyright Rochester Asian American Organization LLC {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}