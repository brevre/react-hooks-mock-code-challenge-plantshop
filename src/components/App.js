// App.js
import React, { useEffect, useState } from 'react';
import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import PlantCard from './PlantCard';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:6001/plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error.message);
    }
  };

  const handleAddPlant = async (newPlant) => {
    try {
      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlant),
      });

      if (!response.ok) {
        throw new Error('Failed to add plant');
      }

      const addedPlant = await response.json();
      setPlants((prevPlants) => [...prevPlants, addedPlant]);
    } catch (error) {
      console.error('Error adding plant:', error.message);
    }
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Plantsy</h1>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <input
        type="text"
        placeholder="Search plants..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <PlantList plants={filteredPlants} /> 
    </div>
  );
}

export default App;
