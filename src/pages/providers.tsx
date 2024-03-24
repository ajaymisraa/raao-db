'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Provider } from '../interfaces';

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
    <div className="min-h-screen bg-gray-900 text-white">
<nav className="bg-gray-800 shadow">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-24">
      <div className="flex">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" legacyBehavior>
            <img src="/transparent.png" alt="RAAO Logo" className="h-24" /> 
          </Link>
        </div>
        <div className="ml-6 flex items-center space-x-8">
          <Link href="/">
            <span className="text-gray-300 hover:text-white">Home</span>
          </Link>
          <Link href="/providers">
            <span className="text-gray-300 hover:text-white">Providers</span>
          </Link>
          {/* Add more navigation items */}
        </div>
      </div>
    </div>
  </div>
</nav>


<main className="py-10">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Providers</h1>
      <div className="flex">
        <div className="w-1/4 mr-8">
          <h2 className="text-xl font-bold mb-4">Filter by Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-bold mt-6 mb-2">Search</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search providers..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((provider) => (
              <div
                key={provider._id}
                className="bg-gray-800 shadow rounded-lg p-6 cursor-pointer"
                onClick={() => handleProviderClick(provider)}
              >
                <h2 className="text-xl font-bold mb-4">{provider.name}</h2>
                <div className="relative">
                  {provider.img && provider.img.length > 0 && (
                    <img
                      src={provider.img[currentImageIndex[provider._id] || 0]}
                      alt={provider.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                </div>
                <p className="text-gray-300 mb-4">{provider.desc.slice(0, 100)}</p>
                <p className="text-gray-300">{provider.other.slice(0, 100)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </main>

  {selectedProvider && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto relative">
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none"
          onClick={handleCloseModal}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">{selectedProvider.name}</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="relative">
              {selectedProvider.img && selectedProvider.img.length > 0 && (
                <img
                  src={selectedProvider.img[currentImageIndex[selectedProvider._id] || 0]}
                  alt={selectedProvider.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
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
          </div>
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Description</h3>
              <p className="text-gray-300">{selectedProvider.desc}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Contact</h3>
              <p>Phone: {selectedProvider.contact.phone}</p>
              <p>Email: {selectedProvider.contact.email}</p>
              <p>Address: {selectedProvider.contact.address}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProvider.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Other Information</h3>
              <p className="text-gray-300">{selectedProvider.other}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  );
}