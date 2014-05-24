class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
    	t.string :countryCode
    	t.string :countryLabel
      	t.timestamps
  end
  
  execute "INSERT INTO countries
				(countryCode, countryLabel)
			VALUES
				('pl-pl', 'poland'),
				('en-us', 'USA');"
  end
end
