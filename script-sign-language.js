// Sign Language Game State Management
class SignLanguageGameState {
    constructor() {
        this.user = {
            level: 1,
            xp: 0,
            totalXP: 0,
            lives: 5,
            maxLives: 5,
            diamonds: 100,
            streak: 0,
            signsLearned: 0,
            practiceTime: 0,
            profilePhoto: 'https://via.placeholder.com/100x100/4CAF50/white?text=U',
            achievements: []
        };
        
        this.signDatabase = this.initializeSignDatabase();
        this.lessons = this.generateSignLessons();
        this.livesTimer = null;
        this.currentLesson = null;
        this.currentPracticeMode = null;
        this.practiceTimer = null;
        this.practiceScore = 0;
        this.cameraStream = null;
        this.loadUserData();
    }
    
    initializeSignDatabase() {
        return {
            alphabet: [
                { id: 'a', word: 'A', category: 'alphabet', image: 'archivos/letraa.jpeg', description: 'Letra A en lenguaje de señas', tips: ['Mantén el puño cerrado', 'El pulgar debe estar al lado'] },
                { id: 'b', word: 'B', category: 'alphabet', image: 'uploaded_files/letrab.jpeg', description: 'Letra B en lenguaje de señas', tips: ['Dedos extendidos hacia arriba', 'Pulgar doblado hacia la palma'] },
                { id: 'c', word: 'C', category: 'alphabet', image: 'uploaded_files/letrac.jpeg', description: 'Letra C en lenguaje de señas', tips: ['Forma una C con la mano', 'Dedos curvados'] },
                { id: 'd', word: 'D', category: 'alphabet', image: 'uploaded_files/letrad.jpeg', description: 'Letra D en lenguaje de señas', tips: ['Índice extendido', 'Otros dedos doblados'] },
                

            ],
            numbers: [
                { id: '0', word: '0', category: 'numbers', image: 'https://via.placeholder.com/150x150/607D8B/white?text=0', description: 'Número 0 en lenguaje de señas', tips: ['Forma un círculo con los dedos'] },
                { id: '1', word: '1', category: 'numbers', image: 'https://via.placeholder.com/150x150/795548/white?text=1', description: 'Número 1 en lenguaje de señas', tips: ['Solo el índice extendido'] },
                { id: '2', word: '2', category: 'numbers', image: 'https://via.placeholder.com/150x150/009688/white?text=2', description: 'Número 2 en lenguaje de señas', tips: ['Índice y medio extendidos'] },
                { id: '3', word: '3', category: 'numbers', image: 'https://via.placeholder.com/150x150/FF5722/white?text=3', description: 'Número 3 en lenguaje de señas', tips: ['Pulgar, índice y medio extendidos'] },
                { id: '4', word: '4', category: 'numbers', image: 'https://via.placeholder.com/150x150/3F51B5/white?text=4', description: 'Número 4 en lenguaje de señas', tips: ['Cuatro dedos extendidos', 'Pulgar doblado'] }
            ],
            family: [
                { id: 'mama', word: 'Mamá', category: 'family', image: 'https://via.placeholder.com/150x150/E91E63/white?text=👩', description: 'Seña para mamá', tips: ['Toca la barbilla con el pulgar', 'Movimiento suave'] },
                { id: 'papa', word: 'Papá', category: 'family', image: 'https://via.placeholder.com/150x150/2196F3/white?text=👨', description: 'Seña para papá', tips: ['Toca la frente con el pulgar', 'Movimiento firme'] },
                { id: 'hermano', word: 'Hermano', category: 'family', image: 'https://via.placeholder.com/150x150/4CAF50/white?text=👦', description: 'Seña para hermano', tips: ['Combina las señas de hombre y mismo'] },
                { id: 'hermana', word: 'Hermana', category: 'family', image: 'https://via.placeholder.com/150x150/FF9800/white?text=👧', description: 'Seña para hermana', tips: ['Combina las señas de mujer y mismo'] }
            ],
            colors: [
                { id: 'rojo', word: 'Rojo', category: 'colors', image: 'https://via.placeholder.com/150x150/F44336/white?text=🔴', description: 'Color rojo', tips: ['Toca los labios con el índice', 'Movimiento hacia abajo'] },
                { id: 'azul', word: 'Azul', category: 'colors', image: 'https://via.placeholder.com/150x150/2196F3/white?text=🔵', description: 'Color azul', tips: ['Forma la letra B', 'Mueve la mano ligeramente'] },
                { id: 'verde', word: 'Verde', category: 'colors', image: 'https://via.placeholder.com/150x150/4CAF50/white?text=🟢', description: 'Color verde', tips: ['Forma la letra G', 'Movimiento de lado a lado'] },
                { id: 'amarillo', word: 'Amarillo', category: 'colors', image: 'https://via.placeholder.com/150x150/FFEB3B/white?text=🟡', description: 'Color amarillo', tips: ['Forma la letra Y', 'Movimiento de sacudida'] }
            ],
            emotions: [
                { id: 'feliz', word: 'Feliz', category: 'emotions', image: 'https://via.placeholder.com/150x150/4CAF50/white?text=😊', description: 'Emoción de felicidad', tips: ['Sonríe mientras haces la seña', 'Movimiento hacia arriba en las mejillas'] },
                { id: 'triste', word: 'Triste', category: 'emotions', image: 'https://via.placeholder.com/150x150/607D8B/white?text=😢', description: 'Emoción de tristeza', tips: ['Expresión facial triste', 'Movimiento hacia abajo en las mejillas'] },
                { id: 'enojado', word: 'Enojado', category: 'emotions', image: 'https://via.placeholder.com/150x150/F44336/white?text=😠', description: 'Emoción de enojo', tips: ['Ceño fruncido', 'Manos tensas'] },
                { id: 'sorprendido', word: 'Sorprendido', category: 'emotions', image: 'https://via.placeholder.com/150x150/FF9800/white?text=😲', description: 'Emoción de sorpresa', tips: ['Ojos y boca abiertos', 'Manos abiertas'] }
            ],
            actions: [
                { id: 'comer', word: 'Comer', category: 'actions', image: 'https://via.placeholder.com/150x150/FF5722/white?text=🍽️', description: 'Acción de comer', tips: ['Lleva la mano a la boca', 'Movimiento repetitivo'] },
                { id: 'beber', word: 'Beber', category: 'actions', image: 'https://via.placeholder.com/150x150/2196F3/white?text=🥤', description: 'Acción de beber', tips: ['Forma un vaso con la mano', 'Lleva a la boca'] },
                { id: 'dormir', word: 'Dormir', category: 'actions', image: 'https://via.placeholder.com/150x150/9C27B0/white?text=😴', description: 'Acción de dormir', tips: ['Inclina la cabeza', 'Manos juntas como almohada'] },
                { id: 'caminar', word: 'Caminar', category: 'actions', image: 'https://via.placeholder.com/150x150/4CAF50/white?text=🚶', description: 'Acción de caminar', tips: ['Dos dedos simulan piernas', 'Movimiento alternado'] }
            ]
        };
    }
    
    generateSignLessons() {
        const lessons = [];
        const unitsData = [
            { title: "Alfabeto Dactilológico", icon: "fas fa-font", lessons: 8, color: "#4CAF50", category: "alphabet" },
            { title: "Números", icon: "fas fa-hashtag", lessons: 8, color: "#2196F3", category: "numbers" },
            { title: "Familia", icon: "fas fa-users", lessons: 8, color: "#FF9800", category: "family" },
            { title: "Colores", icon: "fas fa-palette", lessons: 8, color: "#9C27B0", category: "colors" },
            { title: "Emociones", icon: "fas fa-smile", lessons: 8, color: "#F44336", category: "emotions" },
            { title: "Acciones", icon: "fas fa-running", lessons: 8, color: "#607D8B", category: "actions" }
        ];
        
        let lessonId = 1;
        unitsData.forEach((unit, unitIndex) => {
            const unitLessons = [];
            for (let i = 0; i < unit.lessons; i++) {
                const isChest = (i + 1) % 8 === 0;
                unitLessons.push({
                    id: lessonId++,
                    type: isChest ? 'chest' : 'lesson',
                    completed: lessonId <= 3,
                    current: lessonId === 3,
                    locked: lessonId > 3,
                    unitIndex,
                    lessonIndex: i,
                    category: unit.category
                });
            }
            lessons.push({
                title: unit.title,
                icon: unit.icon,
                color: unit.color,
                category: unit.category,
                lessons: unitLessons,
                progress: unitLessons.filter(l => l.completed).length
            });
        });
        
        return lessons;
    }
    
    getAllSigns() {
        return [
            ...this.signDatabase.alphabet,
            ...this.signDatabase.numbers,
            ...this.signDatabase.family,
            ...this.signDatabase.colors,
            ...this.signDatabase.emotions,
            ...this.signDatabase.actions
        ];
    }
    
    getSignsByCategory(category) {
        if (category === 'all') return this.getAllSigns();
        return this.signDatabase[category] || [];
    }
    
    saveUserData() {
        localStorage.setItem('kaizenSignUserData', JSON.stringify(this.user));
        localStorage.setItem('kaizenSignLessons', JSON.stringify(this.lessons));
    }
    
    loadUserData() {
        const savedUser = localStorage.getItem('kaizenSignUserData');
        const savedLessons = localStorage.getItem('kaizenSignLessons');
        
        if (savedUser) {
            this.user = { ...this.user, ...JSON.parse(savedUser) };
        }
        
        if (savedLessons) {
            this.lessons = JSON.parse(savedLessons);
        }
        
        this.updateUI();
    }
    
    updateUI() {
        // Update header stats
        document.getElementById('streakCount').textContent = this.user.streak;
        document.getElementById('diamondCount').textContent = this.user.diamonds;
        document.getElementById('livesCount').textContent = this.user.lives;
        document.getElementById('modalLivesCount').textContent = this.user.lives;
        
        // Update level and XP
        document.getElementById('currentLevel').textContent = this.user.level;
        document.getElementById('currentXP').textContent = this.user.xp;
        const xpNeeded = this.user.level * 100;
        const xpProgress = (this.user.xp / xpNeeded) * 100;
        document.getElementById('xpFill').style.width = `${xpProgress}%`;
        
        // Update profile stats
        document.getElementById('totalXP').textContent = this.user.totalXP;
        document.getElementById('currentStreak').textContent = this.user.streak;
        document.getElementById('signsLearned').textContent = this.user.signsLearned;
        document.getElementById('practiceTime').textContent = this.user.practiceTime;
        
        // Update profile photos
        document.getElementById('profileImg').src = this.user.profilePhoto;
        document.getElementById('profilePhotoLarge').src = this.user.profilePhoto;
        
        this.renderLessons();
        this.renderDictionary();
        this.renderAchievements();
        this.checkLivesTimer();
    }
    
    renderLessons() {
        const container = document.getElementById('lessonsContainer');
        container.innerHTML = '';
        
        this.lessons.forEach((unit, unitIndex) => {
            const unitElement = document.createElement('div');
            unitElement.className = 'lesson-unit';
            
            unitElement.innerHTML = `
                <div class="unit-header">
                    <h3 class="unit-title" style="color: ${unit.color}">
                        <i class="${unit.icon}"></i>
                        ${unit.title}
                    </h3>
                    <span class="unit-progress">${unit.progress}/${unit.lessons.length}</span>
                </div>
                <div class="lessons-grid" id="unit-${unitIndex}">
                </div>
            `;
            
            container.appendChild(unitElement);
            
            const lessonsGrid = document.getElementById(`unit-${unitIndex}`);
            unit.lessons.forEach((lesson, lessonIndex) => {
                const lessonElement = document.createElement('div');
                lessonElement.className = `lesson-node ${this.getLessonClass(lesson)}`;
                
                if (lesson.type === 'chest') {
                    lessonElement.innerHTML = '<i class="fas fa-treasure-chest"></i>';
                } else {
                    // Get a sign from the unit's category for display
                    const signs = this.getSignsByCategory(unit.category);
                    const signIndex = lessonIndex % signs.length;
                    const sign = signs[signIndex];
                    if (sign) {
                        lessonElement.style.backgroundImage = `url(${sign.image})`;
                        lessonElement.style.backgroundSize = 'cover';
                        lessonElement.style.backgroundPosition = 'center';
                        lessonElement.innerHTML = `<span style="background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px;">${sign.word}</span>`;
                    } else {
                        lessonElement.innerHTML = lesson.id;
                    }
                }
                
                if (!lesson.locked) {
                    lessonElement.addEventListener('click', () => this.startLesson(lesson));
                }
                
                lessonsGrid.appendChild(lessonElement);
            });
        });
    }
    
    renderDictionary(category = 'all') {
        const grid = document.getElementById('dictionaryGrid');
        const signs = this.getSignsByCategory(category);
        
        grid.innerHTML = '';
        
        signs.forEach(sign => {
            const item = document.createElement('div');
            item.className = 'dictionary-item';
            item.innerHTML = `
                <img src="${sign.image}" alt="${sign.word}">
                <h4>${sign.word}</h4>
                <p>${sign.description}</p>
            `;
            
            item.addEventListener('click', () => this.showSignDetail(sign));
            grid.appendChild(item);
        });
    }
    
    renderAchievements() {
        const grid = document.getElementById('achievementGrid');
        const achievements = [
            { id: 'first_sign', name: 'Primera Seña', icon: 'fas fa-hand-paper', requirement: 1, current: this.user.signsLearned },
            { id: 'alphabet_master', name: 'Maestro del Alfabeto', icon: 'fas fa-font', requirement: 26, current: this.user.signsLearned },
            { id: 'streak_week', name: 'Racha Semanal', icon: 'fas fa-fire', requirement: 7, current: this.user.streak },
            { id: 'practice_hour', name: 'Hora de Práctica', icon: 'fas fa-clock', requirement: 60, current: this.user.practiceTime },
            { id: 'level_five', name: 'Nivel 5', icon: 'fas fa-star', requirement: 5, current: this.user.level },
            { id: 'diamond_collector', name: 'Coleccionista', icon: 'fas fa-gem', requirement: 500, current: this.user.diamonds }
        ];
        
        grid.innerHTML = '';
        
        achievements.forEach(achievement => {
            const item = document.createElement('div');
            const isUnlocked = achievement.current >= achievement.requirement;
            item.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;
            
            item.innerHTML = `
                <i class="${achievement.icon}"></i>
                <span>${achievement.name}</span>
            `;
            
            grid.appendChild(item);
        });
    }
    
    getLessonClass(lesson) {
        if (lesson.completed) return 'completed';
        if (lesson.current) return 'current';
        if (lesson.locked) return 'locked';
        if (lesson.type === 'chest') return 'chest';
        return '';
    }
    
    startLesson(lesson) {
        if (lesson.locked) return;
        
        if (lesson.type === 'chest') {
            this.openTreasureChest();
            return;
        }
        
        if (this.user.lives <= 0) {
            this.showShop();
            return;
        }
        
        this.currentLesson = lesson;
        this.showSignLessonModal();
    }
    
    showSignLessonModal() {
        const modal = document.getElementById('signLessonModal');
        const content = document.getElementById('signLessonContent');
        
        content.innerHTML = this.generateSignLessonContent();
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    generateSignLessonContent() {
        const unit = this.lessons[this.currentLesson.unitIndex];
        const signs = this.getSignsByCategory(unit.category);
        const targetSign = signs[Math.floor(Math.random() * signs.length)];
        
        const lessonTypes = [
            'identify_sign',
            'match_word',
            'multiple_choice'
        ];
        
        const lessonType = lessonTypes[Math.floor(Math.random() * lessonTypes.length)];
        
        let html = '';
        
        switch (lessonType) {
            case 'identify_sign':
                html = this.generateIdentifySignLesson(targetSign, signs);
                break;
            case 'match_word':
                html = this.generateMatchWordLesson(targetSign, signs);
                break;
            case 'multiple_choice':
                html = this.generateMultipleChoiceLesson(targetSign, signs);
                break;
        }
        
        return html;
    }
    
    generateIdentifySignLesson(targetSign, signs) {
        const options = this.getRandomSigns(signs, 4, targetSign);
        
        let html = `
            <div class="sign-question">
                <h2>¿Qué seña es esta?</h2>
                <div class="sign-display">
                    <img src="${targetSign.image}" alt="Seña misteriosa">
                </div>
            </div>
            <div class="sign-options">
        `;
        
        options.forEach((option, index) => {
            html += `
                <div class="sign-option" data-answer="${option.id === targetSign.id}">
                    <span>${option.word}</span>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.sign-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const isCorrect = e.target.closest('.sign-option').dataset.answer === 'true';
                    this.checkSignAnswer(isCorrect);
                });
            });
        }, 100);
        
        return html;
    }
    
    generateMatchWordLesson(targetSign, signs) {
        const options = this.getRandomSigns(signs, 4, targetSign);
        
        let html = `
            <div class="sign-question">
                <h2>Encuentra la seña para: <strong>${targetSign.word}</strong></h2>
            </div>
            <div class="sign-options">
        `;
        
        options.forEach((option, index) => {
            html += `
                <div class="sign-option" data-answer="${option.id === targetSign.id}">
                    <img src="${option.image}" alt="${option.word}">
                    <span>${option.word}</span>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.sign-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const isCorrect = e.target.closest('.sign-option').dataset.answer === 'true';
                    this.checkSignAnswer(isCorrect);
                });
            });
        }, 100);
        
        return html;
    }
    
    generateMultipleChoiceLesson(targetSign, signs) {
        const wrongOptions = this.getRandomSigns(signs, 3, targetSign).filter(s => s.id !== targetSign.id);
        const allOptions = [targetSign, ...wrongOptions].sort(() => Math.random() - 0.5);
        
        let html = `
            <div class="sign-question">
                <h2>¿Cuál es la seña correcta para "${targetSign.word}"?</h2>
            </div>
            <div class="sign-options">
        `;
        
        allOptions.forEach((option, index) => {
            html += `
                <div class="sign-option" data-answer="${option.id === targetSign.id}">
                    <img src="${option.image}" alt="${option.word}">
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.sign-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const isCorrect = e.target.closest('.sign-option').dataset.answer === 'true';
                    this.checkSignAnswer(isCorrect);
                });
            });
        }, 100);
        
        return html;
    }
    
    getRandomSigns(signs, count, exclude = null) {
        const filtered = exclude ? signs.filter(s => s.id !== exclude.id) : signs;
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count - 1);
        
        if (exclude) {
            selected.push(exclude);
            return selected.sort(() => Math.random() - 0.5);
        }
        
        return selected;
    }
    
    checkSignAnswer(isCorrect) {
        if (isCorrect) {
            this.completeSignLesson();
        } else {
            this.loseLife();
        }
    }
    
    completeSignLesson() {
        const lesson = this.currentLesson;
        lesson.completed = true;
        lesson.current = false;
        
        // Find next lesson
        const unitIndex = lesson.unitIndex;
        const lessonIndex = lesson.lessonIndex;
        
        if (lessonIndex + 1 < this.lessons[unitIndex].lessons.length) {
            this.lessons[unitIndex].lessons[lessonIndex + 1].current = true;
            this.lessons[unitIndex].lessons[lessonIndex + 1].locked = false;
        } else if (unitIndex + 1 < this.lessons.length) {
            this.lessons[unitIndex + 1].lessons[0].current = true;
            this.lessons[unitIndex + 1].lessons[0].locked = false;
        }
        
        // Update progress
        this.lessons[unitIndex].progress++;
        this.user.signsLearned++;
        this.user.xp += 25;
        this.user.totalXP += 25;
        
        // Check for level up
        const xpNeeded = this.user.level * 100;
        if (this.user.xp >= xpNeeded) {
            this.user.level++;
            this.user.xp = 0;
            this.showLevelUpAnimation();
        }
        
        this.user.streak++;
        
        this.saveUserData();
        this.updateUI();
        this.closeSignLessonModal();
        this.showSuccessAnimation();
    }
    
    loseLife() {
        this.user.lives--;
        this.updateUI();
        
        if (this.user.lives <= 0) {
            this.startLivesTimer();
            this.closeSignLessonModal();
            this.showNoLivesMessage();
        } else {
            this.showIncorrectAnimation();
        }
        
        this.saveUserData();
    }
    
    // Practice Mode Methods
    startPracticeMode(mode) {
        this.currentPracticeMode = mode;
        this.practiceScore = 0;
        
        const modal = document.getElementById('practiceModal');
        const content = document.getElementById('practiceContent');
        
        // Reset score display
        document.getElementById('practiceScore').textContent = '0';
        
        // Set timer based on mode
        let timeLimit = 300; // 5 minutes default
        if (mode === 'quick') timeLimit = 300;
        else if (mode === 'spelling') timeLimit = 600;
        else if (mode === 'numbers') timeLimit = 480;
        else if (mode === 'conversation') timeLimit = 720;
        
        this.startPracticeTimer(timeLimit);
        
        content.innerHTML = this.generatePracticeContent(mode);
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    generatePracticeContent(mode) {
        switch (mode) {
            case 'quick':
                return this.generateQuickPractice();
            case 'spelling':
                return this.generateSpellingPractice();
            case 'numbers':
                return this.generateNumbersPractice();
            case 'conversation':
                return this.generateConversationPractice();
            default:
                return '<p>Modo de práctica no disponible</p>';
        }
    }
    
    generateQuickPractice() {
        const allSigns = this.getAllSigns();
        const randomSign = allSigns[Math.floor(Math.random() * allSigns.length)];
        const options = this.getRandomSigns(allSigns, 4, randomSign);
        
        let html = `
            <div class="practice-question">
                <h3>Práctica Rápida - Pregunta ${this.practiceScore + 1}</h3>
                <div class="sign-display">
                    <img src="${randomSign.image}" alt="Seña">
                </div>
                <p>¿Qué significa esta seña?</p>
            </div>
            <div class="sign-options">
        `;
        
        options.forEach(option => {
            html += `
                <div class="sign-option" data-answer="${option.id === randomSign.id}">
                    <span>${option.word}</span>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.sign-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const isCorrect = e.target.closest('.sign-option').dataset.answer === 'true';
                    this.handlePracticeAnswer(isCorrect);
                });
            });
        }, 100);
        
        return html;
    }
    
    generateSpellingPractice() {
        const alphabet = this.signDatabase.alphabet;
        const words = ['HOLA', 'AMOR', 'CASA', 'AGUA', 'BIEN'];
        
        // Select word based on current question number
        const wordIndex = Math.floor(this.practiceScore / 4) % words.length;
        const word = words[wordIndex];
        const letterIndex = this.practiceScore % word.length;
        const currentLetter = word[letterIndex];
        
        const targetSign = alphabet.find(s => s.word === currentLetter);
        
        if (!targetSign) return this.generateQuickPractice();
        
        const options = this.getRandomSigns(alphabet, 4, targetSign);
        
        let html = `
            <div class="practice-question">
                <h3>Deletreo - Palabra: "${word}"</h3>
                <p>Letra ${letterIndex + 1} de ${word.length}: <strong>${currentLetter}</strong></p>
                <div class="word-progress">
                    ${word.split('').map((letter, index) => 
                        `<span class="${index < letterIndex ? 'completed' : index === letterIndex ? 'current' : 'pending'}">${letter}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="sign-options">
        `;
        
        options.forEach(option => {
            html += `
                <div class="sign-option" data-answer="${option.id === targetSign.id}">
                    <img src="${option.image}" alt="${option.word}">
                    <span>${option.word}</span>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.sign-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const isCorrect = e.target.closest('.sign-option').dataset.answer === 'true';
                    this.handlePracticeAnswer(isCorrect);
                });
            });
        }, 100);
        
        return html;
    }
    
    generateNumbersPractice() {
        const numbers = this.signDatabase.numbers;
        const targetSign = numbers[Math.floor(Math.random() * numbers.length)];
        const options = this.getRandomSigns(numbers, 4, targetSign);
        
        let html = `
            <div class="practice-question">
                <h3>Números - Pregunta ${this.practiceScore + 1}</h3>
                <div class="sign-display">
                    <img src="${targetSign.image}" alt="Número">
                </div>
                <p>¿Qué número es este?</p>
            </div>
            <div class="sign-options">
        `;
        
        options.forEach(option => {
            html += `
                <div class="sign-option" data-answer="${option.id === targetSign.id}">
                    <span>${option.word}</span>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.sign-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const isCorrect = e.target.closest('.sign-option').dataset.answer === 'true';
                    this.handlePracticeAnswer(isCorrect);
                });
            });
        }, 100);
        
        return html;
    }
    
    generateConversationPractice() {
        const conversationSigns = [...this.signDatabase.family, ...this.signDatabase.emotions, ...this.signDatabase.actions];
        const targetSign = conversationSigns[Math.floor(Math.random() * conversationSigns.length)];
        const options = this.getRandomSigns(conversationSigns, 4, targetSign);
        
        let html = `
            <div class="practice-question">
                <h3>Conversación - Pregunta ${this.practiceScore + 1}</h3>
                <p>¿Cuál es la seña para: <strong>${targetSign.word}</strong>?</p>
            </div>
            <div class="sign-options">
        `;
        
        options.forEach(option => {
            html += `
                <div class="sign-option" data-answer="${option.id === targetSign.id}">
                    <img src="${option.image}" alt="${option.word}">
                    <span>${option.word}</span>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.sign-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const isCorrect = e.target.closest('.sign-option').dataset.answer === 'true';
                    this.handlePracticeAnswer(isCorrect);
                });
            });
        }, 100);
        
        return html;
    }
    
    handlePracticeAnswer(isCorrect) {
        if (isCorrect) {
            this.practiceScore++;
            document.getElementById('practiceScore').textContent = this.practiceScore;
            this.showPracticeSuccess();
            
            // Generate next question after a short delay
            setTimeout(() => {
                const content = document.getElementById('practiceContent');
                if (content) {
                    content.innerHTML = this.generatePracticeContent(this.currentPracticeMode);
                }
            }, 1500);
        } else {
            this.showPracticeError();
            // Don't generate new question, let them try again
        }
    }
    
    startPracticeTimer(seconds) {
        let timeLeft = seconds;
        const timerElement = document.getElementById('practiceTimer');
        
        // Clear any existing timer
        if (this.practiceTimer) {
            clearInterval(this.practiceTimer);
        }
        
        // Set initial time display
        const minutes = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerElement.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
        
        this.practiceTimer = setInterval(() => {
            timeLeft--;
            
            if (timeLeft >= 0) {
                const minutes = Math.floor(timeLeft / 60);
                const secs = timeLeft % 60;
                timerElement.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
            }
            
            if (timeLeft < 0) {
                this.endPracticeSession();
            }
        }, 1000);
    }
    
    endPracticeSession() {
        if (this.practiceTimer) {
            clearInterval(this.practiceTimer);
            this.practiceTimer = null;
        }
        
        // Update practice time
        this.user.practiceTime += 5; // Add 5 minutes
        this.user.diamonds += this.practiceScore * 2; // 2 diamonds per correct answer
        
        this.saveUserData();
        this.updateUI();
        this.closePracticeModal();
        
        this.showPracticeResults();
    }
    
    
    
    // Dictionary Methods
    showSignDetail(sign) {
        const modal = document.getElementById('signDetailModal');
        
        document.getElementById('signDetailTitle').textContent = sign.word;
        document.getElementById('signDetailImage').src = sign.image;
        document.getElementById('signDescription').textContent = sign.description;
        
        const tipsList = document.getElementById('signTipsList');
        tipsList.innerHTML = '';
        sign.tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    searchSigns(query) {
        const allSigns = this.getAllSigns();
        const filtered = allSigns.filter(sign => 
            sign.word.toLowerCase().includes(query.toLowerCase()) ||
            sign.description.toLowerCase().includes(query.toLowerCase())
        );
        
        const grid = document.getElementById('dictionaryGrid');
        grid.innerHTML = '';
        
        filtered.forEach(sign => {
            const item = document.createElement('div');
            item.className = 'dictionary-item';
            item.innerHTML = `
                <img src="${sign.image}" alt="${sign.word}">
                <h4>${sign.word}</h4>
                <p>${sign.description}</p>
            `;
            
            item.addEventListener('click', () => this.showSignDetail(sign));
            grid.appendChild(item);
        });
    }
    
    // Timer and Lives Management (same as original)
    startLivesTimer() {
        if (this.livesTimer) return;
        
        const timerDuration = 30 * 60 * 1000; // 30 minutes
        const endTime = Date.now() + timerDuration;
        localStorage.setItem('livesTimerEnd', endTime.toString());
        
        this.livesTimer = setInterval(() => {
            const now = Date.now();
            const remaining = endTime - now;
            
            if (remaining <= 0) {
                this.user.lives = this.user.maxLives;
                this.stopLivesTimer();
                this.updateUI();
                this.saveUserData();
            } else {
                this.updateLivesTimer(remaining);
            }
        }, 1000);
        
        document.getElementById('livesTimer').classList.remove('hidden');
    }
    
    stopLivesTimer() {
        if (this.livesTimer) {
            clearInterval(this.livesTimer);
            this.livesTimer = null;
        }
        localStorage.removeItem('livesTimerEnd');
        document.getElementById('livesTimer').classList.add('hidden');
    }
    
    checkLivesTimer() {
        const endTime = localStorage.getItem('livesTimerEnd');
        if (endTime && this.user.lives < this.user.maxLives) {
            const remaining = parseInt(endTime) - Date.now();
            if (remaining > 0) {
                this.startLivesTimer();
            } else {
                this.user.lives = this.user.maxLives;
                this.saveUserData();
            }
        }
    }
    
    updateLivesTimer(remaining) {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        document.getElementById('timerText').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Modal Management
    closeSignLessonModal() {
        document.getElementById('signLessonModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    closePracticeModal() {
        document.getElementById('practiceModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        if (this.practiceTimer) {
            clearInterval(this.practiceTimer);
            this.practiceTimer = null;
        }
    }
    
    closeSignDetailModal() {
        document.getElementById('signDetailModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    openTreasureChest() {
        const modal = document.getElementById('chestModal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    claimRewards() {
        this.user.diamonds += 50;
        this.user.lives = Math.min(this.user.lives + 2, this.user.maxLives);
        
        this.currentLesson.completed = true;
        
        this.saveUserData();
        this.updateUI();
        this.closeChestModal();
    }
    
    closeChestModal() {
        document.getElementById('chestModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    showShop() {
        const modal = document.getElementById('shopModal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    closeShopModal() {
        document.getElementById('shopModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    buyItem(item) {
        switch (item) {
            case 'lives':
                if (this.user.diamonds >= 50) {
                    this.user.diamonds -= 50;
                    this.user.lives = this.user.maxLives;
                    this.stopLivesTimer();
                    this.showPurchaseSuccess('¡Vidas recargadas!');
                } else {
                    this.showInsufficientDiamonds();
                }
                break;
            case 'streak-freeze':
                if (this.user.diamonds >= 100) {
                    this.user.diamonds -= 100;
                    this.showPurchaseSuccess('¡Protector de racha activado!');
                } else {
                    this.showInsufficientDiamonds();
                }
                break;
            case 'premium-videos':
                if (this.user.diamonds >= 200) {
                    this.user.diamonds -= 200;
                    this.showPurchaseSuccess('¡Videos premium desbloqueados!');
                } else {
                    this.showInsufficientDiamonds();
                }
                break;
        }
        
        this.saveUserData();
        this.updateUI();
        this.closeShopModal();
    }
    
    // Animation Methods
    showSuccessAnimation() {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> ¡Correcto! +25 XP';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    showIncorrectAnimation() {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = '<i class="fas fa-times-circle"></i> Incorrecto. -1 vida';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    showLevelUpAnimation() {
        const notification = document.createElement('div');
        notification.className = 'levelup-notification';
        notification.innerHTML = `<i class="fas fa-star"></i> ¡Nivel ${this.user.level}!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
    
    showPracticeSuccess() {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = '<i class="fas fa-thumbs-up"></i> ¡Correcto!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 1500);
    }
    
    showPracticeError() {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = '<i class="fas fa-times"></i> Intenta de nuevo';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 1500);
    }
    
    showPracticeResults() {
        const notification = document.createElement('div');
        notification.className = 'levelup-notification';
        notification.innerHTML = `<i class="fas fa-trophy"></i> Sesión completada: ${this.practiceScore} puntos`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
    
    showNoLivesMessage() {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = '<i class="fas fa-heart-broken"></i> Sin vidas. Espera 30 minutos o compra más.';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
    
    showPurchaseSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    showInsufficientDiamonds() {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = '<i class="fas fa-gem"></i> Diamantes insuficientes';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize sign language game state
let signGameState;

// Preloader functionality (same as original)
function initPreloader() {
    let progress = 0;
    const progressElement = document.querySelector('.loading-percentage');
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(showLogoScreen, 500);
        }
        progressElement.textContent = Math.floor(progress) + '%';
    }, 150);
}

function showLogoScreen() {
    const preloader = document.getElementById('preloader');
    const logoScreen = document.getElementById('logoScreen');
    
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        logoScreen.classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('startBtn').classList.remove('hidden');
        }, 1500);
    }, 500);
}

function showMainApp() {
    const logoScreen = document.getElementById('logoScreen');
    const mainApp = document.getElementById('mainApp');
    
    logoScreen.style.opacity = '0';
    logoScreen.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        logoScreen.style.display = 'none';
        mainApp.classList.remove('hidden');
        
        signGameState = new SignLanguageGameState();
    }, 800);
}

// Tab navigation
function initTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.add('active');
        });
    });
}

// Dictionary functionality
function initDictionary() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            signGameState.searchSigns(query);
        } else {
            signGameState.renderDictionary();
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            signGameState.renderDictionary(category);
        });
    });
}



// Practice functionality
function initPractice() {
    const practiceBtns = document.querySelectorAll('.practice-btn');
    practiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            signGameState.startPracticeMode(mode);
        });
    });
}

// Profile photo upload
function initProfilePhotoUpload() {
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const photoInput = document.getElementById('photoInput');
    
    changePhotoBtn.addEventListener('click', () => {
        photoInput.click();
    });
    
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoUrl = e.target.result;
                signGameState.user.profilePhoto = photoUrl;
                signGameState.saveUserData();
                signGameState.updateUI();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Modal event listeners
function initModalEventListeners() {
    // Close sign lesson modal
    document.getElementById('closeSignLessonBtn').addEventListener('click', () => {
        signGameState.closeSignLessonModal();
    });
    
    // Close practice modal
    document.getElementById('closePracticeBtn').addEventListener('click', () => {
        signGameState.closePracticeModal();
    });
    
    // Close sign detail modal
    document.getElementById('closeSignDetailBtn').addEventListener('click', () => {
        signGameState.closeSignDetailModal();
    });
    
    // Close shop modal
    document.getElementById('closeShopBtn').addEventListener('click', () => {
        signGameState.closeShopModal();
    });
    
    // Claim rewards
    document.getElementById('claimRewardsBtn').addEventListener('click', () => {
        signGameState.claimRewards();
    });
    
    // Buy items
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.dataset.item;
            signGameState.buyItem(item);
        });
    });
    
    // Profile icon click
    document.getElementById('profileIcon').addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        document.querySelector('[data-tab="profile"]').classList.add('active');
        document.getElementById('profileTab').classList.add('active');
    });
    
    // Lives container click
    document.querySelector('.lives-container').addEventListener('click', () => {
        if (signGameState.user.lives < signGameState.user.maxLives) {
            signGameState.showShop();
        }
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Sign detail modal actions
    document.getElementById('favoriteBtn').addEventListener('click', () => {
        // Toggle favorite functionality
        const btn = document.getElementById('favoriteBtn');
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.innerHTML = '<i class="fas fa-heart"></i> Favorito';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.innerHTML = '<i class="far fa-heart"></i> Favorito';
        }
    });
    
    document.getElementById('practiceSignBtn').addEventListener('click', () => {
        signGameState.closeSignDetailModal();
        signGameState.startPracticeMode('quick');
    });
}

// Add notification styles
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .success-notification,
        .error-notification,
        .levelup-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-out 2.5s forwards;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .success-notification {
            background: linear-gradient(45deg, #4CAF50, #45a049);
        }
        
        .error-notification {
            background: linear-gradient(45deg, #f44336, #d32f2f);
        }
        
        .levelup-notification {
            background: linear-gradient(45deg, #ffd700, #ffb300);
            font-size: 18px;
            animation: slideInRight 0.5s ease-out, pulse 0.5s ease-out 0.5s, fadeOut 0.5s ease-out 3.5s forwards;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        @media (max-width: 768px) {
            .success-notification,
            .error-notification,
            .levelup-notification {
                top: 10px;
                right: 10px;
                left: 10px;
                padding: 12px 20px;
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addNotificationStyles();
    initPreloader();
    
    document.getElementById('startBtn').addEventListener('click', showMainApp);
    
    initTabNavigation();
    initDictionary();
    initPractice();
    initProfilePhotoUpload();
    initModalEventListeners();
});

// Prevent context menu and text selection for better mobile experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('selectstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Handle orientation change for mobile devices
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

