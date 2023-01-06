'use strict';

(($) => {
  new Vue({
    el: '#joshoangtien',
    data: {
      saved: false,
      focus: false,
      loading: false,
      fullname: '',
      church: '',
      phone: '',
      vehicle: '',
      message: '',
      // images: ''
    },
    methods: {
      onSubmit() {
        this.saved = false;
        this.loading = true;

        let data = new FormData();
        data.append('entry.381268566', this.fullname);
        data.append('entry.2066137785', this.phone);
        data.append('entry.573948609', this.church);
        data.append('entry.732922175', this.vehicle);
        data.append('entry.1655263764', this.message);
        
        // attach images
        // if (this.images.length > 5) {
        //   data.append('entry.1948647566', this.images);
        // }

        fetch('https://docs.google.com/forms/d/e/1FAIpQLSc5TuTLxp8olb7NeqbuG0FbLePZiEeC8XWWNyLtm4iPW2Osdg/formResponse?embedded=true', {
          method: 'post',
          body: data
        }).finally(() => {
          this.saved = true;
          this.fullname = '';
          this.church = '';
          this.phone = '';
          this.vehicle = '';
          this.message = '';
          // this.images = '';
          $('#message').focus();

          this.loading = false;
        });
      },
      handlePhone(event) {
        console.log(event.target.value)
        var that = this;
        fetch('./assets/js/data.json').then((response) => response.json()).then((json) => 
          json.forEach(function(data){
            if (String(event.target.value) === String(data.phone)) {
              const { elements } = document.querySelector('form');
              for (const [ key, value ] of Object.entries(data) ) {
                const field = elements.namedItem(key)
                field && (field.value = value)
                if (key === 'fullname') {
                  that.fullname = value
                } else if(key === 'church') {
                  that.church = value
                } else if (key === 'phone') {
                  that.data.phone = value
                }
              }
            }
          })
        );
      }
    },
    mounted() {
      this.focus = true;
    }
  });
})(jQuery);