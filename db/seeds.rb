require 'faker'

Startup.destroy_all
Level.destroy_all

localisations = [
    'Bordeaux',
    'Toulouse',
    'Lyon',
    'Paris',
    'Lille',
    'Marseille',
    'Nice',
    'Strasbourg',
    'Madrid',
    'Barcelone',
    'Nice',
    'Nantes',
    'Grenoble',
    'Rouen',
    'Clermont-Ferrand',
    'Nancy',
    'Londres',
    'Berlin',
    'Milan'
]

fail_reason = [
  'Mauvaise gestion économique',
  'Crise financière',
  'Marché en berne',
  'Mésentente des collaborateurs',
  'Secteur trop concurrentiel',
  'Accumulation de créances clients',
  'Cause judiciaire'
]


20.times do
  year = (2005..2016).to_a.sample
  startup = Startup.create!(
    name: Faker::Name.name,
    founder: Faker::Name.name,
    birth_year: year,
    death_year: (year + (1..7).to_a.sample),
    employees_range: Faker::Number.between(from: 1, to: 30).to_s,
    localisation: localisations.sample,
    sector: Faker::Company.industry,
    fail_reason: fail_reason.sample,
  )
end

#Manque des users

#Manque des projets

#Manque des favoris

#Manque level
Level.create!(rank: 1, metrics: "funds", index: 1, description: "Niveau 1 - Love Money")
Level.create!(rank: 1, metrics: "funds", index: 2, description: "Niveau 2 - Bourse BPI")
Level.create!(rank: 1, metrics: "funds", index: 3, description: "Niveau 3 - Série A")
Level.create!(rank: 1, metrics: "funds", index: 4, description: "Niveau 4 - IPO")

#Manque attempts
