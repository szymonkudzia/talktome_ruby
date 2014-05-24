class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :from
      t.integer :to
      t.string  :message
      t.datetime :dateInserted#, :default => Time.now
      
      t.timestamps
    end
  end
end
