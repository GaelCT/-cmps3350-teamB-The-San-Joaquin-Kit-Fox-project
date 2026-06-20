DROP TABLE IF EXISTS sightings;

CREATE TABLE sightings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  observer_name VARCHAR(100) NOT NULL,
  sighting_date DATE NOT NULL,
  location_name VARCHAR(150) NOT NULL,
  health_status VARCHAR(50) NOT NULL DEFAULT 'Unknown',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO sightings
  (observer_name, sighting_date, location_name, health_status, notes)
VALUES
  ('Test Observer', '2026-06-01', 'CSUB campus', 'Unknown', 'Possible kit fox sighting near campus.'),
  ('Sample Student', '2026-06-02', 'Kern River Parkway', 'Appears healthy', 'Small fox-like animal seen near open ground.'),
  ('Demo User', '2026-06-03', 'Open field near parking lot', 'Needs review', 'Brief sighting at dusk.');