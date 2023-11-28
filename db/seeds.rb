

require 'faker'

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

