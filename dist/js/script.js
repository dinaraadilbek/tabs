'use-strict'
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


        // Tabs

        function hideTabsContent() {
          tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
          });
          
          tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
          })
        };

        function showTabsContent(i = 0) {
          tabsContent[i].classList.add('show', 'fade');
          tabsContent[i].classList.remove('hide');
          tabs[i].classList.add('tabheader__item_active');
        };

        hideTabsContent();
        showTabsContent();

        tabsParent.addEventListener('click', (event) => {
          const target = event.target;

          if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
              if(target == item) {
                hideTabsContent();
                showTabsContent(i);
              }
            });
          }
       

        // Timer

        const deadline = '2023-05-25';

        function getTimeRemaining(endTime) {
          let days, hours, minutes, seconds;
          const t = Date.parse(endTime) - Date.parse(new Date());

          if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
          } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t/ 1000 / 60) % 60),
                seconds = Math.floor((t/ 1000 % 60));
          };
                

          return {
            'total': t,
            'days': days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds': seconds
          };
        }

        function getZero(num) {
          if(num >= 0 && num < 10) {
            return `0${num}`;
          } else {
            return num;
          }
        }

        function setClock(selector, endTime) {
          const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(upDateClock, 1000); 


              upDateClock();
              function upDateClock() {
                const t = getTimeRemaining(endTime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if(t.total <= 0) {
                  clearInterval(timeInterval);
                }
              } 
            };
          
            setClock('.timer', deadline);
      });


      // Modal window

      const modalTrigger = document.querySelectorAll('[data-modal]');
      const modal = document.querySelector('.modal');
      const modalCloseBtn = document.querySelector('[data-close]');

      modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
          modal.classList.add('show');
          modal.classList.remove('hide');
          document.body.style.overflow = 'hidden';
        });
      })

      function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
      };

      modalCloseBtn.addEventListener('click', closeModal);
     
      modal.addEventListener('click', (e) => {
        if(e.target === modal) {
        closeModal();
        };
      });

      document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
          closeModal();
        }
      })
    });
     

