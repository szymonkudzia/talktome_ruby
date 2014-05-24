class CreateInterests < ActiveRecord::Migration
  def change
    create_table :interests do |t|
      t.integer :userId
      t.integer :type, :default => 0 # 0 - other, 1 - country
      t.string :interest

      t.timestamps
    end
  end
end
