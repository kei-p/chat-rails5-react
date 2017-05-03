class CreateParticipations < ActiveRecord::Migration[5.0]
  def change
    create_table :participations do |t|
      t.references :user, foreign_key: true
      t.references :room, foreign_key: true
      t.boolean :online

      t.timestamps
    end
  end
end
