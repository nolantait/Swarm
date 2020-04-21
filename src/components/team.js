Crafty.c('Team', {
  required: 'Color',

  init() {
    this.color = `#${(Math.random() * 0xFFFFFF<<0).toString(16)}`;
  },
});

