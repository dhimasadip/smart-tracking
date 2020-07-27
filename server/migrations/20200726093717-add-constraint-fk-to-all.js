'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Connections', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_fkey_UserId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then(_=> {
      return queryInterface.addConstraint('Connections', {
        fields: ['DeviceId'],
        type: 'foreign key',
        name: 'custom_fkey_DeviceId',
        references: {
          table: 'Devices',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
    .then(_=> {
      return queryInterface.addConstraint('Histories', {
        fields: ['DeviceId'],
        type: 'foreign key',
        name: 'custom_fkey_DeviceIdHistories',
        references: {
          table: 'Devices',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
    .then(_=> {
      return queryInterface.addConstraint('Buzzers', {
        fields: ['DeviceId'],
        type: 'foreign key',
        name: 'custom_fkey_DeviceIdBuzzer',
        references: {
          table: 'Devices',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Connections', 'custom_fkey_UserId', {})
    .then(_=> {
      return queryInterface.removeConstraint('Connections', 'custom_fkey_DeviceId', {})
    })
    .then(_=> {
      return queryInterface.removeConstraint('Histories', 'custom_fkey_DeviceIdHistories', {})
    })
    .then(_=> {
      return queryInterface.removeConstraint('Buzzers', 'custom_fkey_DeviceIdBuzzer', {})
    })
  }
};
